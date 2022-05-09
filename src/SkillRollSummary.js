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