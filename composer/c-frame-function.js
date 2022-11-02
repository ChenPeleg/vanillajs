export function Cf(tag = 'div') {
    tag = tag || 'div';
    this.elem = document.createElement(tag);
    this.append = function (...CfuncChild) {
        CfuncChild.forEach((c) => {
            this.elem.appendChild(c.elem);
        });
    };
    this.styler = function (styleObj) {
        Object.keys(styleObj).forEach((prop) => this.elem.style.setProperty([prop], styleObj[prop]));
        return this;
    };
    return this;
}
