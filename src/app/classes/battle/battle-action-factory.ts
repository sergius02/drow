import {BattleAction} from '../../interfaces/battle/battle-action';
import {AttackAction} from './attack-action';
import {BattleParticipant} from '../../interfaces/battle-participant';
import {HealAction} from './heal-action';
import {DoNothingAction} from './do-nothing-action';

export class BattleActionFactory {

  static createAttakAction(from: BattleParticipant): BattleAction {
    return new AttackAction(from);
  }

  static createHealAction(from: BattleParticipant): BattleAction {
    return new HealAction(from);
  }

  static createDoNothinAction(from: BattleParticipant): BattleAction {
    return new DoNothingAction(from);
  }

}
