import { RoutesEnum } from "./routes";

export class PageModel {
    /**@param {RoutesEnum} type */
    constructor(type) {
        this.type = type;
        this.name = RoutesEnum[type];
        this.isActive = false;
        this.classPointer = null;
        this.element = null
    }
}