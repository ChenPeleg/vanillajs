import { MatchError } from './testing.match-error.js';

class Matcher {
    constructor(value) {
        this.value = value;
    }
    toBe(match) {
        if (this.value === match) {
            return this.matched();
        }
        const message = `${this.value} is not equal to ${match}`;
        return this.mismatch(message);
    }
    toBeTruthy() {
        if (this.value) {
            return this.matched();
        }
        const message = `${this.value} is not truthy`;
        return this.mismatch(message);
    }
    matched() {
        return true;
    }
    mismatch(messaage) {
        throw new MatchError(messaage);
    }
}

export default Matcher;
