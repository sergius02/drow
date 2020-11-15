import { BattleAction } from '../../interfaces/battle/battle-action';
import {BattleParticipant} from '../../interfaces/battle-participant';
export class DoNothingAction implements BattleAction{
  type: string;
  text: string;
  from: BattleParticipant;
  to: BattleParticipant;
  hitPoints: number;

  constructor(from: BattleParticipant) {
    this.from = from;
    this.to = null;
    this.hitPoints = 0;
    this.type = 'donothing';
    this.updateText();
  }

  updateText(): void {
    this.text = `${ this.from.name } doesn\'t do nothing...`;
  }

  confirmAction(): boolean {
      return this.from !== undefined;
  }

  undoAction(): boolean {
    return false;
  }

}
