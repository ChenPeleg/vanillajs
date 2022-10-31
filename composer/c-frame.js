/**
 * @typedef CProps
 * @member {string} tag
 * @member {string} id
 * @member {string} text
 * @member {import('../types/css-types.js').CSSObject} style
 */

/** @param {CProps} options   */
export const C = (options) => {
    let { tag, id } = options;
    tag = tag || 'div';
    id = id || `id_${(Math.random() * 10000) | 0}`;
    const elem = document.createElement(tag);

    elem.id = id;

    return {
        /** @property {  styleObj : import('../types/css-types.js').CSSObject }
         * @return C*/
        styler(styleObj) {
            Object.keys(styleObj).forEach((prop) => this.elem.style.setProperty([prop], styleObj[prop]));
            return this;
        },

        /**         * @param {C } childComponents         */
        append(...childComponents) {
            childComponents.forEach((c) => {
                this.elem.appendChild(c);
            });
        },
        get elem() {
            return elem;
        },
    };
};
