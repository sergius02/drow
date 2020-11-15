import {BattleParticipant} from '../battle-participant';

export interface BattleAction {
    type: string;
    text: string;
    from: BattleParticipant;
    to: BattleParticipant;
    hitPoints: number;

  updateText(): void;
  confirmAction(): boolean;
  undoAction(): boolean;
}
