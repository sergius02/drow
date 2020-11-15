export interface BattleParticipant {
    name: string;
    initiative: number;
    participantType?: string;
    hitPoints: number;
    currentHitPoints: number;
    isDead: boolean;
}
