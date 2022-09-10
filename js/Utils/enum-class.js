export class Enum {
    /**@param {string []} members*/
    constructor(members) {
        members.forEach(element => {
            this[element] = Symbol(element);
        });
    }
}

