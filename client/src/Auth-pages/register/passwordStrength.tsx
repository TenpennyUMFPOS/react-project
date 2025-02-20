
import { faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';
export enum passwordStrength {
    STRONG = 'strong',
    MEDIUM = 'medium',
    WEAK = 'weak'
}

const atLeastMinimumLength = (password: string) => new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUpperCaseLetter = (password: string) => new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowerCaseLetter = (password: string) => new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneSpecialLetter = (password: string) => new RegExp(/[!@#$%^&*()-_=+[\]{};':"\\|,.<>/?]/).test(password);
const atLeastOneNumber = (password: string) => new RegExp(/.*[0-9].*/).test(password);

export function testPasswordStrength(password: string): passwordStrength {
    if (!password) return passwordStrength.WEAK;
    let score = 0;
    if (atLeastMinimumLength(password)) score++
    if (atLeastOneUpperCaseLetter(password)) score++
    if (atLeastOneLowerCaseLetter(password)) score++
    if (atLeastOneSpecialLetter(password)) score++
    if (atLeastOneNumber(password)) score++
    if (score > 3) return passwordStrength.MEDIUM;
    if (score > 5) return passwordStrength.STRONG;
    return passwordStrength.WEAK;
}



export function getIcon(strength: passwordStrength) {
    let icon = faExclamation;
    switch (strength) {
        case passwordStrength.WEAK:
            icon = faExclamation
            break;
        case passwordStrength.MEDIUM:
            icon = faExclamation
            break;
        case passwordStrength.STRONG:
            icon = faCheck
            break;
    }
    return icon;
}


export function generateColors(strength: passwordStrength): string[] {
    let result: string[] = [];
    const COLORS = {
        NEUTRAL: 'hsla(0, 0%, 88%, 1)',
        WEAK: 'hsla(353, 100%, 38%, 1)',
        MEDIUM: 'hsla(40, 71%, 51%, 1)',
        STRONG: 'hsla(134, 73%, 30%, 1)',
    };

    switch (strength) {
        case passwordStrength.WEAK:
            result = [COLORS.WEAK, COLORS.NEUTRAL, COLORS.NEUTRAL, COLORS.NEUTRAL];
            break;
        case passwordStrength.MEDIUM:
            result = [COLORS.MEDIUM, COLORS.NEUTRAL, COLORS.NEUTRAL, COLORS.NEUTRAL];
            break;
        case passwordStrength.STRONG:
            result = [COLORS.STRONG, COLORS.NEUTRAL, COLORS.NEUTRAL, COLORS.NEUTRAL];
            break;
    }
    return result
}



