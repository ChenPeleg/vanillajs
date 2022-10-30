export const Utils = {
    random: (num) => Math.floor(Math.random() * num + 1),
    /** @type {(element : HTMLElement, styleObj : import('../types/css-types.js').CSSObject)=>void} */
    styler: (element, styleObj) => {
        Object.keys(styleObj).forEach((prop) => (element.style[prop] = styleObj[prop]));
    },
};
