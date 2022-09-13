import { Utils } from "../Utils/utils.js";

export class ProtoTypes {
    /** @param  {HTMLElement} rootElement*/
    constructor(rootElement) {
        this.isActiveRoute = false;
        this.container = this.createContainer(rootElement)
    }
    #active = false;
    set active(val) {
        this.#active = val;
    }

    get active() {
        return this.#active;
    }
    /** @param  {HTMLElement} root*/
    createContainer(root) {
        const container = document.createElement('div');
        container.id = this.generateRandId(Object.getPrototypeOf(this).constructor.name)
        root.appendChild(container);
        return container;
    }
    generateRandId(name) {
        return name + '_' + Utils.random(10000);
    }
    showChain(obj) {
        const getProtoChaninToArray = (o, arr = []) => {
            arr.push(o)
            const proto = Object.getPrototypeOf(o);
            return proto ? getProtoChaninToArray(proto, arr) : arr.concat([proto])
        }
        const getSpecialType = (o) => {
            switch (o) {
                case Array:
                    return "Array constructor";
                case Array.prototype:
                    return "Array.prototype";
                case String:
                    return "String constructor";
                case String.prototype:
                    return "String.prototype";
                case Object:
                    return "Object constructor";
                case Object.prototype:
                    return "Object.prototype";
                case Function:
                    return "Function constructor";
                case Function.prototype:
                    return "Function.prototype";
                case null:
                    return "null"

                default:
                    return "";
            }

        }
        const protoArray = getProtoChaninToArray(obj, [])
        protoArray.forEach((o, i) => {
            const text = "Level: " + (protoArray.length - i - 1) + (getSpecialType(o) ? ` (${getSpecialType(o)})` : [o])
            console.log(text)
            console.dir(o)

            protoArray.length - i > 1 ? console.log("    ↓    ") : null

        })
    }
}