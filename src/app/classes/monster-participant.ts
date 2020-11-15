import { BattleParticipant } from '../interfaces/battle-participant';
import { Monster } from '../interfaces/monster';
export class MonsterParticipant implements BattleParticipant {
  name: string;
  initiative: number;
  participantType: string;
  monster: Monster;
  hitPoints: number;
  currentHitPoints: number;
  isDead: boolean;

  constructor(monster: Monster, initiative: number) {
    this.monster = monster;
    this.initiative = initiative;
    this.participantType = 'enemy';
    this.name = monster.name;
    this.hitPoints = monster.hit_points;
    this.currentHitPoints = monster.hit_points;
    this.isDead = false;
  }

}
