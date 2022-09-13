import { RoutesEnum } from "./routes.js";

export class PageModel {
    /**@param {RoutesEnum} type */
    constructor(type) {
        this.type = type;
        this.name = /**@type {string} */ (Object.keys(RoutesEnum).find(k => RoutesEnum[k] === type));
        this.isActive = false;
        this.classPointer = null;
        this.element = null
    }
}