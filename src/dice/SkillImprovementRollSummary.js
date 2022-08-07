export class SkillImprovementRollSummary { 
    constructor(roll, skill, oldSkillVal, improvement, sanity, passes) {
        this.roll = roll;
        this.skill = skill;
        this.oldSkillVal = oldSkillVal;
        this.improvement = improvement;
        this.sanity = sanity;
        this.passes = passes;
    }
}
