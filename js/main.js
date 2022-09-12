import { Utils } from "./Utils/utils.js";
//import * as appComp from "./components/app-comp.js"
import { PageModel } from "./models/page-model.js";
import { RoutesEnum } from "./models/routes.js";


class mainApp {

    static CreatePages() {

    }

    /**@type {PageModel []} */
    mainLinks;
    constructor() {
        /**@type {Record<keyof RoutesEnum,PageModel>} */
        //  this.pages = {};
        window.addEventListener("popstate",
            this.popHandler
        );
        this.createRouterLinks()
        this.setElementPointers()
    }
    createRouterLinks() {

        const linkContainer =  /**@type {HTMLDivElement} */(document.querySelector('#the-link-container'));

        Object.keys(RoutesEnum).forEach(routeName => {
            const a = document.createElement('a');
            a.className = 'main-links';
            a.href = '#' + routeName;
            a.innerHTML = routeName;
            linkContainer.appendChild(a)

            console.log(routeName)
        })
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
    /** @type {(link : PageModel)=> void} */
    activateRouteComponent(link) {
        switch (link.route) {
            //RoutesEnum.about

        }
    }
    setElementPointers() {
        try {
            const mainLinksElements = /**@type {NodeListOf <HTMLAnchorElement>} */ (document.querySelectorAll('a.main-links'))
            this.mainLinks = [...mainLinksElements].map(l => {
                return new PageModel(l.href.replace('#', ''), l)
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
