import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BattleParticipant} from 'src/app/interfaces/battle-participant';
import {BattleActionsGridComponent} from './battle-actions-grid/battle-actions-grid.component';
import {BattleActionFactory} from '../../../classes/battle/battle-action-factory';

@Component({
  selector: 'app-battle-actions',
  templateUrl: './battle-actions.component.html',
  styleUrls: ['./battle-actions.component.scss']
})
export class BattleActionsComponent implements OnInit {

  @ViewChild('battleActionContainerRef', { read: ViewContainerRef })
  battleActionContainerRef: ViewContainerRef;
  actionsLog: ComponentRef<BattleActionsGridComponent>[];

  @Input() battleParticipants: BattleParticipant[];
  @Output() participantsChanged: EventEmitter<BattleParticipant[]> =
    new EventEmitter<BattleParticipant[]>();

  @Input() battleIsFinish: boolean;
  @Output() battleFinishChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  currentParticipantIndex: number;
  actionCurrentPosition: number;
  actionTypeSelected: string;


  constructor( private componentFactoryResolver: ComponentFactoryResolver ) {
    this.currentParticipantIndex = 0;
    this.actionsLog = [];
    this.actionCurrentPosition = 0;
    this.actionTypeSelected = 'attack';
  }

  ngOnInit(): void {
  }

  addAction(): void {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(BattleActionsGridComponent);

    const childComponentRef = this.battleActionContainerRef
      .createComponent(componentFactory);

    this.battleActionContainerRef.move(childComponentRef.hostView, 0);

    const childComponent = childComponentRef.instance;
    childComponent.index = this.actionCurrentPosition++;
    childComponent.parentRef = this;
    childComponent.battleParticipants = this.battleParticipants;

    switch ( this.actionTypeSelected ) {
      case 'attack':
        childComponent.action =
          BattleActionFactory.createAttakAction(this.getCurrentParticipant());
        break;
      case 'heal':
        childComponent.action =
          BattleActionFactory.createHealAction(this.getCurrentParticipant());
        break;
      case 'donothing':
        childComponent.action =
          BattleActionFactory.createDoNothinAction(this.getCurrentParticipant());
        break;
      default:
        break;
    }

    this.actionsLog.push(childComponentRef);
  }

  getCurrentParticipant(): BattleParticipant {
    return this.battleParticipants[this.currentParticipantIndex];
  }

  removeAction(index: number): void {
    if (this.battleActionContainerRef.length < 1) {
      return;
    }

    const componentRef = this.actionsLog.filter( value => value.instance.index === index )[0];

    const refIndex: number = this.battleActionContainerRef.indexOf( componentRef.hostView );

    this.battleActionContainerRef.remove(refIndex);
    this.actionsLog = this.actionsLog.filter( value => value.instance.index !== index);
    this.actionCurrentPosition--;
  }

  endTurn(): void {
    this.currentParticipantIndex === this.battleParticipants.length - 1 ?
      this.currentParticipantIndex = 0 : this.currentParticipantIndex ++;

    let correctParticipant = false;
    while (!correctParticipant) {
      this.battleParticipants[this.currentParticipantIndex].isDead ?
        this.currentParticipantIndex++ : correctParticipant = true;
    }
  }

  checkBattleState(): void {
    let indexToRemove = -1;
    this.battleParticipants.forEach( (participant, index) => {
      if (participant.currentHitPoints < 1) {
        indexToRemove = index;
        participant.isDead = true;
      } else {
        participant.isDead = false;
      }
    });

    if (indexToRemove !== -1) {
      // this.battleParticipants =
      //   this.battleParticipants.filter(
      //     (participant, index) => index !== indexToRemove);


      let theresEnemies = false;
      let theresHeroes = false;
      this.battleParticipants.forEach( participant => {
        if (participant.participantType === 'hero' && !participant.isDead) {
          theresHeroes = true;
        }

        if (participant.participantType === 'enemy' && !participant.isDead) {
          theresEnemies = true;
        }
      });

      if (!theresEnemies || !theresHeroes) {
        this.battleIsFinish = true;
        this.battleFinishChanged.emit(this.battleIsFinish);
        this.actionsLog.forEach(battleActionRef => {
          battleActionRef.instance.battleFinish = true;
        });
      }

      this.participantsChanged.emit(this.battleParticipants);
    }
  }
}
