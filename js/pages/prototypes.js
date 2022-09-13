import { Utils } from "../Utils/utils.js";
/** 
 * @typedef ProtoChainMember
 * @prop {any} obj
 * @prop {string} description
 * @prop {number} level
 * @prop {string} specialType
  */


export class ProtoTypes {
    /** @param  {HTMLElement} rootElement*/
    constructor(rootElement) {
        this.isActiveRoute = false;
        this.container = this.createContainer(rootElement)
        globalThis.showChain = (...args) => this.showChain(...args);
        this.renderChain()
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
        container.id = this.generateRandId(Object.getPrototypeOf(this).constructor.name);
        container.innerHTML = Object.getPrototypeOf(this).constructor.name + ' ';
        root.appendChild(container);
        return container;
    }
    renderChain() {
        const chainMemberContainer = document.createElement('div');
        /**@type {import("../types/css-types.js").CSSObejct} */
        Utils.styler(chainMemberContainer, {
            height: '100px',
            'background-color': 'red',
            'width': '200px'
        })
        this.container.appendChild(chainMemberContainer)
        //chainMemberContainer.setStyle = {}

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
        const protoArray = getProtoChaninToArray(obj, []);
        /**@type {ProtoChainMember[]} */
        const completeChain = protoArray.map((o, i) => {
            return { obj: o, level: (protoArray.length - i - 1), description: [o], specialType: getSpecialType(o) }
        });


    }

    consoleLogChain(completeChain) {
        completeChain.forEach((o) => {
            const text = "Level: " + o.level + " " + (o.specialType || o.description)
            console.log(text)
            console.dir(o)

            o.level > 0 ? console.log("    ↓    ") : null

        })
    }
}