import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MonsterParticipant } from 'src/app/classes/monster-participant';
import { APIReference } from 'src/app/interfaces/api-reference';
import { Monster } from 'src/app/interfaces/monster';
import { MonstersService } from 'src/app/services/monsters-service.service';
import {Dice} from '../../../classes/dice';

@Component({
  selector: 'app-monsters-grid-battle',
  templateUrl: './monsters-grid-battle.component.html',
  styleUrls: ['./monsters-grid-battle.component.scss']
})
export class MonstersGridBattleComponent implements OnInit {

  monsterList: APIReference[];
  monstersSuggestions: APIReference[] = [];
  monstersChallengeRatings: any[];

  typehead: FormControl = new FormControl();

  monsterName: string;
  monsterIndex: string;
  monsterInitiative: number;

  @Input() monsters: MonsterParticipant[] = [];
  @Input() areEnemiesSelected: boolean;
  @Output() monstersChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(private monstersService: MonstersService) { }

  ngOnInit(): void {
    this.monsterInitiative = 1;
    this.monstersService.getAllMonsters().subscribe(
      result => this.monsterList = result
    );
  }

  addMonster(): void {
    if (this.monsterName === '') {
      return;
    }

    let monsterSelected: Monster;
    this.monstersService.getMonsterInfo(this.monsterIndex)
      .subscribe(monster => {
        monsterSelected = monster;
        this.monsters.push(new MonsterParticipant(monster,
          this.monsterInitiative));
        this.monsterName = '';
        this.monsterInitiative = 1;
        this.monsterIndex = '';

        this.monsters.sort((a, b) => b.initiative - a.initiative);
        this.checkIfEnemiesSelected();
      });
  }

  deleteMonster(monster: MonsterParticipant): void {
    const index = this.monsters.indexOf(monster);
    if (index > -1) {
      this.monsters.splice(index, 1);
    }

    this.checkIfEnemiesSelected();
  }

  deleteEnemies(): void {
    this.monsters = [];
    this.checkIfEnemiesSelected();
  }

  checkIfEnemiesSelected(): void {
    if (this.monsters.length < 1) {
      this.areEnemiesSelected = false;
      this.monstersChanged.emit(this.areEnemiesSelected);
    }
    else {
      this.areEnemiesSelected = true;
      this.monstersChanged.emit(this.areEnemiesSelected);
    }
  }

  suggest(): void {
    if (this.monsterName === '') {
      this.monstersSuggestions = [];
      return;
    }

    this.monstersSuggestions = this.monsterList
    .filter(
      monsterReference =>
        monsterReference.name.toLocaleLowerCase()
          .includes(this.monsterName.toLocaleLowerCase())
    ).splice(0, 5);
  }

  fillMonsterNameField(monsterReference: APIReference): void {
    this.monsterName = monsterReference.name;
    this.monsterIndex = monsterReference.index;
    this.monstersSuggestions = [];
  }

  getChallengeBadgeColor(challengeRating: number): string {
    if (challengeRating < 10){
      return 'badge rounded-pill bg-success';
    } else if (challengeRating >= 10 && challengeRating < 20){
      return 'badge rounded-pill bg-warning text-dark';
    } else {
      return 'badge rounded-pill bg-danger';
    }
  }

  generateRandomInitiative(): void {
    this.monsterInitiative = Dice.generateD20Dice();
  }
}
