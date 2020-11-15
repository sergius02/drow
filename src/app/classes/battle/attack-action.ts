import { BattleAction } from '../../interfaces/battle/battle-action';
import {BattleParticipant} from '../../interfaces/battle-participant';
export class AttackAction implements BattleAction{
  type: string;
  text: string;
  from: BattleParticipant;
  to: BattleParticipant;
  hitPoints: number;

  constructor( from: BattleParticipant ) {
    this.from = from;
    this.to = null;
    this.hitPoints = 0;
    this.type = 'attack';
    this.updateText();
  }

  updateText(): void {
    this.text = `${ this.from?.name } attacks <strong>${ this.to?.name }</strong> dealing <strong>${ this.hitPoints }</strong> of damage`;
  }

  confirmAction(): boolean {
    if (this.from === undefined || this.to === undefined){
      return false;
    }

    this.to.currentHitPoints -= this.hitPoints;
    return true;
  }

  undoAction(): boolean {
    if (this.from === undefined || this.to === undefined) {
      return true;
    }

    this.to.currentHitPoints += this.hitPoints;
    return false;
  }

}
