import { BaseStyles } from '../styles/baseStyles.js';
import { Utils } from '../Utils/utils.js';
import { C } from '../../composer/c-frame.js';

/**
 * @typedef ProtoChainMember
 * @prop {any} obj
 * @prop {string} description
 * @prop {number} level
 * @prop {string} specialType
 * @prop {string} typeOf
 */
export class ProtoTypes {
    /** @param  {HTMLElement} rootElement*/
    constructor(rootElement) {
        this.isActiveRoute = false;
        this.chainContainer = C('div').elem;
        this.container = this.createContainer(rootElement);
        // eslint-disable-next-line no-undef
        globalThis.showChain = (...args) => this.showChain(...args);
        this.renderChain(this.buildChainObject([]));
    }

    #active = false;
    set active(val) {
        this.#active = val;
        this.container.style.setProperty('visibility', val ? 'visible' : 'hidden');
    }

    get active() {
        return this.#active;
    }

    /** @param  {HTMLElement} root*/
    createContainer(root) {
        const container = document.createElement('div');
        container.id = this.generateRandId(Object.getPrototypeOf(this).constructor.name);
        const header = C({ tag: 'div', text: 'Prototype Chain', style: { margin: '0.5em' } }).elem;
        container.appendChild(header);
        container.appendChild(this.chainContainer);
        root.appendChild(container);
        return container;
    }

    /** @param {ProtoChainMember[]} chain*/
    renderChain(chain) {
        this.chainContainer.innerHTML = '';
        chain.forEach((el) => {
            const oneChainElement = this.renderOnChainElement(el);
            this.chainContainer.appendChild(oneChainElement);
        });

        //chainMemberContainer.setStyle = {}
    }

    /** @param {ProtoChainMember } chainElem*/
    renderOnChainElement(chainElem) {
        const chainMemberContainer = document.createElement('div');
        const chainMemeberArrow = C('div').styler({
            width: '99%',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            'justify-content': 'center',
        }).elem;
        /** @type {import('../types/css-types.js').CSSObject} */
        Utils.styler(chainMemberContainer, {
            height: '100px',
            'background-color': '#AABBAA',
            width: '200px',
            'border-radius': '4px',
            margin: '20px',
            'box-shadow': '2px 2px 6px rgba(0,0,0,.5)',
            'font-size': '22px',
            'justify-content': 'center',
            ...BaseStyles.flexCol,
        });
        const chainMemeberHeader = document.createElement('H4');
        Utils.styler(chainMemeberHeader, { margin: '0px' });
        const chainMemeberLevelHeader = document.createElement('H4');
        Utils.styler(chainMemeberLevelHeader, {
            margin: '0px',
            color: 'green',
            'text-shadow':
                '2px 2px 1px rgba(0,0,0,1), -2px -2px 1px rgba(0,0,0,1),  -2px  2px 1px rgba(0,0,0,1), 2px -2px 1px rgba(0,0,0,1), 2px -2px 3px rgba(0,0,0,1)',
        });

        Utils.styler(chainMemeberArrow, {
            'font-size': '35px',
            'font-weight': '700',
        });

        chainMemeberLevelHeader.innerHTML = 'Level: ' + chainElem.level + ' ';
        //
        chainMemeberHeader.innerHTML = chainElem.specialType || chainElem.description + ' (' + chainElem.typeOf + ')';
        chainMemeberArrow.innerHTML = '<span>↓</span>';
        chainMemberContainer.append(chainMemeberLevelHeader);
        chainMemberContainer.append(chainMemeberHeader);
        chainMemberContainer.append(chainMemeberArrow);
        return chainMemberContainer;
    }

    generateRandId(name) {
        return name + '_' + Utils.random(10000);
    }

    showChain(obj) {
        /**@type {ProtoChainMember[]} */
        const completeChain = this.buildChainObject(obj);
        this.renderChain(completeChain);
        this.consoleLogChain(completeChain);
    }

    buildChainObject(obj) {
        const getProtoChaninToArray = (o, arr = []) => {
            arr.push(o);
            const proto = Object.getPrototypeOf(o);
            return proto ? getProtoChaninToArray(proto, arr) : arr.concat([proto]);
        };
        const getSpecialType = (o) => {
            switch (o) {
                case Array:
                    return 'Array constructor';
                case Array.prototype:
                    return 'Array.prototype';
                case String:
                    return 'String constructor';
                case String.prototype:
                    return 'String.prototype';
                case Number:
                    return 'Number constructor';
                case Number.prototype:
                    return 'Number.prototype';
                case Boolean:
                    return 'Boolean constructor';
                case Boolean.prototype:
                    return 'Boolean.prototype';

                case Object:
                    return 'Object constructor';
                case Object.prototype:
                    return 'Object.prototype';
                case Function:
                    return 'Function constructor';
                case Function.prototype:
                    return 'Function.prototype';
                case null:
                    return 'null';

                default:
                    return '';
            }
        };
        const protoArray = getProtoChaninToArray(obj, []);
        /**@type {ProtoChainMember[]} */
        const completeChain = protoArray.map((o, i) => {
            return {
                obj: o,
                level: protoArray.length - i - 1,
                description: [o],
                specialType: getSpecialType(o),
                typeOf: typeof o,
            };
        });
        return completeChain;
    }

    /**@type {(completeChain : ProtoChainMember[])=> void} */
    consoleLogChain(completeChain) {
        completeChain.forEach((o) => {
            const text = 'Level: ' + o.level + ' ' + (o.specialType || o.description + ' (' + o.typeOf + ')');
            console.log(text);
            console.dir(o);

            o.level > 0 ? console.log('    ↓    ') : null;
        });
    }
}
