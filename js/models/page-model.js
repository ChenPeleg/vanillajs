import { RoutesEnum } from './routes.js';

export class PageModel {
    /**@param {RoutesEnum} type */
    constructor(type) {
        this.type = type;
        this.name = /**@type {string} */ (
            Object.keys(RoutesEnum).find((k) => RoutesEnum[k] === type)
        );
        this.componentPointer = null;
        this.element = null;
    }

    set isActive(value) {
        this.#_isActive = value;
        if (this.componentPointer) {
            this.componentPointer.active = this.#_isActive;
        }
    }

    get isActive() {
        return this.#_isActive;
    }

    #_isActive = false;
}
