import { SkillRollSummary } from '../SkillRollSummary';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';

function getRollDefinition(e) {

    if (e.getModifierState("Shift")) {
        return "((2d10kl1-1)*10) + 1d10";
    } else if (e.getModifierState("Control")) {
        return "((2d10kh1-1)*10) + 1d10";
    }

    return "1d100";
}

function isFumble(successValue, result) {
    // Per rules: if your skill value is 50 or less, then a fumble is anything 96 or bigger
    //            if your skill value is 51 or more, then a fumble is only an exact 100 roll
    return (successValue < 50 && result.total >= 96) || result.total === 100;
}

export function rollDice(skill, openFunc, e) {

    const rollDefinition = getRollDefinition(e)
    const result = new DiceRoll(rollDefinition);

    const successValue = skill.successValue;
    const extremeSuccess = Math.floor(successValue * 0.2);
    const hardSuccess = Math.floor(successValue * 0.5);

    let severity = "Unknown!";

    if (isFumble(successValue, result)) {
        severity = "Fumble";
    } else if (result.total <= extremeSuccess) {
        severity = "Extreme Success";
    } else if (result.total <= hardSuccess) {
        severity = "Hard Success";
    } else if (result.total <= successValue) {
        severity = "Success";
    } else {
        severity = "Failure";
    }

    const summary = new SkillRollSummary(severity, result, skill);
    openFunc(summary);
}
