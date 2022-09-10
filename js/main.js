import { Utils } from "./Utils/utils.js";
import * as appComp from "./components/app-comp.js"


class mainApp {
    constructor() {
        window.addEventListener("popstate",
            this.popHandler
        );
        this.setRouterOutlet()
    }
    popHandler(ev) {
        const route = window.location.hash.replace("#", '');
        const mainLinks = /**@type {NodeListOf <HTMLAnchorElement>} */ (document.querySelectorAll('a.main-links'))
        mainLinks.forEach(l => {
            if (l.href.includes(route)) {
                l.classList.add('active')
            } else
                l.classList.remove('active')
        })

    }
    setRouterOutlet() {
        try {
            const appmain =  /**@type {Element & {shadowRoot}} */(document.querySelector("app-main"));
            const outlet = /**@type {Element} */(appmain.shadowRoot.querySelector('#router-outlet'));
            this.routerOutlet = outlet;
        } catch (e) {
            setTimeout(() => this.setRouterOutlet(), 1000)
        }


    }
}
const app = new mainApp();


export { app }
