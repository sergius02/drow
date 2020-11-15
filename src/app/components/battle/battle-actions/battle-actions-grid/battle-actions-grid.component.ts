import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BattleActionsComponent} from '../battle-actions.component';
import {BattleAction} from '../../../../interfaces/battle/battle-action';
import {BattleParticipant} from '../../../../interfaces/battle-participant';

@Component({
  selector: 'app-battle-actions-grid',
  templateUrl: './battle-actions-grid.component.html',
  styleUrls: ['./battle-actions-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BattleActionsGridComponent implements OnInit {
  index: number;
  parentRef: BattleActionsComponent;
  action: BattleAction;
  battleParticipants: BattleParticipant[];

  targetSelected: number;
  targetHitPoints: number;

  actionSaved: boolean;
  battleFinish: boolean;

  constructor() {
    this.targetSelected = 0;
    this.targetHitPoints = 0;
    this.battleFinish = false;
  }

  ngOnInit(): void {
    this.onChange();
  }

  onChange(): void {
    this.action.to = this.battleParticipants[this.targetSelected];
    this.action.hitPoints = this.targetHitPoints;
    this.action.updateText();
  }

  removeAction(): void {
    this.parentRef.removeAction(this.index);
  }

  saveAction(): void {
    this.actionSaved = this.action.confirmAction();
    this.parentRef.checkBattleState();
  }

  modifyAction(): void {
    this.actionSaved = this.action.undoAction();
    this.parentRef.checkBattleState();
  }
}
