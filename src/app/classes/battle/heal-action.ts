import { BattleAction } from '../../interfaces/battle/battle-action';
import {BattleParticipant} from '../../interfaces/battle-participant';
export class HealAction implements BattleAction{
  type: string;
  text: string;
  from: BattleParticipant;
  to: BattleParticipant;
  hitPoints: number;

  constructor(from: BattleParticipant) {
    this.from = from;
    this.to = null;
    this.type = 'heal';
    this.hitPoints = 0;
    this.updateText();
  }

  updateText(): void {
    this.text = `${ this.from?.name } heals <strong>${ this.to?.name }</strong> a total of <strong>${ this.hitPoints }</strong> hit points`;
  }

  confirmAction(): boolean {
      if (this.from === undefined || this.to === undefined) {
        return false;
      }

      this.to.currentHitPoints += this.hitPoints;
      return true;
  }

  undoAction(): boolean {
    if (this.from === undefined || this.to === undefined) {
      return true;
    }

    this.to.currentHitPoints -= this.hitPoints;
    return false;
  }
}
