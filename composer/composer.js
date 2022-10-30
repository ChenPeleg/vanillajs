/**
 * @typedef CProps
 * @member {string} tag
 * @member {string} id
 * @member {string} text
 * @member {import('../types/css-types.js').CSSObject} style
 */

export class Comp {
    /** @param {CProps} options   */
    constructor(options) {
        let { tag, id, text, style } = options;
        tag = tag || 'div';
        id = id || `id_${(Math.random() * 10000) | 0}`;
        this.elem = document.createElement(tag);
        if (text) {
            this.elem.innerHTML = text;
        }
        if (style) {
            this.styler(style);
        }
        this.elem.id = id;
    }

    /** @property {  styleObj : import('../types/css-types.js').CSSObject }
     * @return Comp*/
    styler(styleObj) {
        Object.keys(styleObj).forEach((prop) => this.elem.style.setProperty([prop], styleObj[prop]));
        return this;
    }
}
