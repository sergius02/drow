export interface Monster {
    index: string;
    name: string;
    size: string;
    type: string;
    subtype: null;
    alignment: string;
    armor_class: number;
    hit_points: number;
    hit_dice: string;
    speed: Speed;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    proficiencies: ProficiencyElement[];
    damage_vulnerabilities: any[];
    damage_resistances: any[];
    damage_immunities: string[];
    condition_immunities: any[];
    senses: Senses;
    languages: string;
    challenge_rating: number;
    xp: number;
    special_abilities: SpecialAbility[];
    actions: Action[];
    legendary_actions: LegendaryAction[];
    url: string;
}

export interface Action {
    name: string;
    desc: string;
    options?: Options;
    attack_bonus?: number;
    damage?: Damage[];
    dc?: Dc;
    usage?: ActionUsage;
}

export interface Damage {
    damage_type: DcTypeClass;
    damage_dice: string;
}

export interface DcTypeClass {
    index: string;
    name: string;
    url: string;
}

export interface Dc {
    dc_type: DcTypeClass;
    dc_value: number;
    success_type: string;
}

export interface Options {
    choose: number;
    from: Array<From[]>;
}

export interface From {
    name: string;
    count: number;
    type: string;
}

export interface ActionUsage {
    type: string;
    dice: string;
    min_value: number;
}

export interface LegendaryAction {
    name: string;
    desc: string;
    dc?: Dc;
    damage?: Damage[];
}

export interface ProficiencyElement {
    value: number;
    proficiency: DcTypeClass;
}

export interface Senses {
    blindsight: string;
    darkvision: string;
    passive_perception: number;
}

export interface SpecialAbility {
    name: string;
    desc: string;
    usage?: SpecialAbilityUsage;
}

export interface SpecialAbilityUsage {
    type: string;
    times: number;
}

export interface Speed {
    walk: string;
    fly: string;
    swim: string;
}
