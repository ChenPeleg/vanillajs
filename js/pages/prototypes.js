import { BaseStyles } from "../styles/baseStyles.js";
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
        const oneChainElement = this.renderOnChainElement({})
        this.container.appendChild(oneChainElement)
        //chainMemberContainer.setStyle = {}

    }
    renderOnChainElement(element) {
        const chainMemberContainer = document.createElement('div');
        /**@type {import("../types/css-types.js").CSSObejct} */
        Utils.styler(chainMemberContainer, {
            height: '100px',
            'background-color': '#AABBAA',
            'width': '200px',
            'border-radius': '4px',
            'box-shadow': '2px 2px 4px rgba(0,0,0,.5)',
            ...BaseStyles.flexCol
        })
        const chainMemeberHeader = document.createElement('H4');
        chainMemeberHeader.innerHTML = 'String.Protoype'
        chainMemberContainer.append(chainMemeberHeader)
        return chainMemberContainer;
    }
    generateRandId(name) {
        return name + '_' + Utils.random(10000);
    }
    showChain(obj) {
        /**@type {ProtoChainMember[]} */
        const completeChain = this.buildChainObject(obj);
        this.consoleLogChain(completeChain);

    }
    buildChainObject(obj) {

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
        return completeChain;


    }
    /**@type {(completeChain : ProtoChainMember[])=> void} */
    consoleLogChain(completeChain) {
        completeChain.forEach((o) => {
            const text = "Level: " + o.level + " " + (o.specialType || o.description)
            console.log(text)
            console.dir(o)

            o.level > 0 ? console.log("    ↓    ") : null

        })
    }
}