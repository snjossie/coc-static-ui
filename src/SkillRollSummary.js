export class SkillRollSummary { 
    constructor(type, rollSummary, skill) {
        this.type = type;
        this.rollSummary = rollSummary;
        this.skill = skill;
    }

    get luckAmount() {
        return this.rollSummary.total - this.skill.successValue
    }
}

export class ArbitraryRollSummary {
    constructor(type, rollSummary) {
        this.type = type;
        this.rollSummary = rollSummary;
    }

    get luckAmount() { 
        return 0;
    }
}

export class DamageRollSummary {
    constructor(type, rollSummary){ 
        this.type = type;
        this.rollSummary = rollSummary;
    }

    get luckAmount() {
        return 0;
    }
}

export class LuckRollSummary { 
    constructor(type, rollSummary) {
        this.type = type;
        this.rollSummary = rollSummary;
    }

    get luckAmount() {
        return 0;
    }
}
