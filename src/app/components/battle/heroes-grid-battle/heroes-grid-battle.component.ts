import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeroParticipant } from 'src/app/classes/hero-participant';
import {Dice} from '../../../classes/dice';

@Component({
  selector: 'app-heroes-grid-battle',
  templateUrl: './heroes-grid-battle.component.html',
  styleUrls: ['./heroes-grid-battle.component.scss']
})
export class HeroesGridBattleComponent implements OnInit {

  heroName = '';
  heroHitPoints = 1;
  heroInitiative = 1;

  @Input() heroes: HeroParticipant[];
  @Input() isPartyCreated = false;
  @Output() partyChanged: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.isPartyCreated = false;
    this.heroInitiative = 1;
  }

  addHero(): void {
    if (this.checkIfNameExist() === false) {
      if (this.heroName === '') {
        return;
      }

      this.heroes.push(new HeroParticipant(this.heroName,
        this.heroInitiative, this.heroHitPoints));
      this.heroName = '';
      this.heroInitiative = 1;
      this.heroHitPoints = 1;
      this.checkIfPartyIsCreated();

      this.heroes.sort((a, b) => b.initiative - a.initiative);
    }
  }

  checkIfNameExist(): boolean {
    let exist = false;
    this.heroes.forEach(hero => {
      if (hero.name === this.heroName) {
        exist = true;
      }
    });

    return exist;
  }

  deleteHero(hero: HeroParticipant): void {
    const index = this.heroes.indexOf(hero);
    if (index > -1) {
      this.heroes.splice(index, 1);
    }

    this.checkIfPartyIsCreated();
  }

  deleteParty(): void {
    this.heroes = [];
    this.checkIfPartyIsCreated();
  }

  checkIfPartyIsCreated(): void {
    if (this.heroes.length < 1) {
      this.isPartyCreated = false;
      this.partyChanged.emit(this.isPartyCreated);
    }
    else {
      this.isPartyCreated = true;
      this.partyChanged.emit(this.isPartyCreated);
    }
  }

  generateRandomInitiative(): void {
    this.heroInitiative = Dice.generateD20Dice();
  }

}
