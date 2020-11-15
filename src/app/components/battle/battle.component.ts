import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MonstersService} from '../../services/monsters-service.service';
import {MonsterParticipant} from '../../classes/monster-participant';
import {HeroParticipant} from '../../classes/hero-participant';
import {BattleParticipant} from '../../interfaces/battle-participant';
import {DocWindowFactory} from '../../classes/docs/doc-window-factory';
import {MonsterDocComponent} from '../monsters/monster-doc/monster-doc.component';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  @ViewChild('monsterBattleDocRef', { read: ViewContainerRef })
  monsterBattleDocContainerRef: ViewContainerRef;
  monsterBattleDocRefs: ComponentRef<MonsterDocComponent>[];
  monsterDocWindowsNumber: number;

  buttonStartDisabled = true;

  isPartySaved = false;
  areEnemiesSelected = false;

  fightStarted = false;

  monsters: MonsterParticipant[];
  heroes: HeroParticipant[];
  allParticipants: BattleParticipant[];
  battleIsFinish: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private monstersService: MonstersService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.monsters = [];
    this.heroes = [];
    this.allParticipants = [];
    this.monsterBattleDocRefs = [];
    this.monsterDocWindowsNumber = 0;
    this.battleIsFinish = false;
  }

  ngOnInit(): void { }

  partyChangedHandler(isPartySaved: boolean): void {
    this.isPartySaved = isPartySaved;
    this.checkIfCanStart();
  }

  monstersChangedHandler(areEnemiesSelected: boolean): void {
    this.areEnemiesSelected = areEnemiesSelected;
    this.checkIfCanStart();
  }

  checkIfCanStart(): void {
    this.buttonStartDisabled = !(this.isPartySaved && this.areEnemiesSelected);
  }

  startFight(): void {
    this.fightStarted = true;
    this.allParticipants = this.allParticipants.concat(this.heroes);
    this.allParticipants  = this.allParticipants.concat(this.monsters);
    this.allParticipants.sort((a, b) => b.initiative - a.initiative);
  }

  participantsChangedHandler(participants: BattleParticipant[]): void {
    this.allParticipants = participants;

  }

  battleFinishChangedHandler(battleFinish: boolean): void {
    this.battleIsFinish = battleFinish;
  }

  openMonsterDoc(monster: BattleParticipant): void {
    if (monster instanceof MonsterParticipant) {
      DocWindowFactory.createMonsterDocWindow(
        this.componentFactoryResolver,
        monster.monster,
        this.monsterBattleDocContainerRef,
        this.monsterBattleDocRefs,
        this.monsterDocWindowsNumber,
        // @ts-ignore
        this
      );
      this.monsterDocWindowsNumber++;
    }
  }

  closeMonsterDoc(index: number): void {
    if (this.monsterBattleDocContainerRef.length < 1) {
      return;
    }

    const componentRef = this.monsterBattleDocRefs.filter(
      value => value.instance.index === index )[0];

    const refIndex: number = this.monsterBattleDocContainerRef.indexOf(
      componentRef.hostView );

    this.monsterBattleDocContainerRef.remove(refIndex);
    this.monsterBattleDocRefs = this.monsterBattleDocRefs.filter(
      value => value.instance.index !== index);
    this.monsterDocWindowsNumber--;
  }

}
