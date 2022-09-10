import { Utils } from "./Utils/utils.js";
import * as appComp from "./components/app-comp.js"
import { RouteModel } from "./models/routes-model.js";
import { Routes, RoutesEnum } from "./models/routes.js";


class mainApp {

    /**@type {RouteModel []} */
    mainLinks;
    constructor() {
        window.addEventListener("popstate",
            this.popHandler
        );
        this.setElementPointers()

    }

    popHandler(ev) {
        const route = window.location.hash.replace("#", '');

        this.mainLinks.forEach(link => {
            const l = link.element;
            if (l.href.includes(route)) {
                l.classList.add('active');
            } else
                l.classList.remove('active')
        })
    }
    /** @type {(link : RouteModel)=> void} */
    activateRouteComponent(link) {
        switch (link.route) {
            //RoutesEnum.about

        }
    }
    setElementPointers() {
        try {
            const mainLinksElements = /**@type {NodeListOf <HTMLAnchorElement>} */ (document.querySelectorAll('a.main-links'))
            this.mainLinks = [...mainLinksElements].map(l => {
                return new RouteModel(l.href.replace('#', ''), l)
            });

            const appmain =  /**@type {Element & {shadowRoot}} */(document.querySelector("app-main"));
            const outlet = /**@type {Element} */(appmain.shadowRoot.querySelector('#router-outlet'));
            this.routerOutlet = outlet;
        } catch (e) {
            setTimeout(() => this.setElementPointers(), 1000)
        }
    }
}
const app = new mainApp();


export { app }
