

const template = document.createElement('template');
template.innerHTML = `
  <style>
    div {
      margin-top: 20px;
      color: green;
      // background-color: white;
      min-height : 80vh;
    }
  </style>
  <div>
  <div id="router-outlet"></div>
   App main
  </div>
`;

class SearchResult extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    /**@type  {ShadowRoot}*/
    // @ts-ignore
    this.shadowRoot.appendChild(template.content.cloneNode(true));

  }

  static get observedAttributes() {
    return ['name-attribute'];
  }

  attributeChangedCallback(name, oldValue, newValue) {

  }
}

window.customElements.define('app-main', SearchResult);

export {


}