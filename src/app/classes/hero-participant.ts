import { BattleParticipant } from '../interfaces/battle-participant';
export class HeroParticipant implements BattleParticipant {
  name: string;
  initiative: number;
  participantType: string;
  hitPoints: number;
  currentHitPoints: number;
  isDead: boolean;

  constructor(name: string, initiative: number, hitPoints: number) {
      this.name = name;
      this.initiative = initiative;
      this.participantType = 'hero';
      this.hitPoints = hitPoints;
      this.currentHitPoints = hitPoints;
      this.isDead = false;
  }

}
