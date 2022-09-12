import { Utils } from "./Utils/utils.js";
//import * as appComp from "./components/app-comp.js"
import { PageModel } from "./models/page-model.js";
import { RoutesEnum } from "./models/routes.js";


class mainApp {

    /**@type {PageModel []} */
    pages;
    constructor() {

        this.createPages();

        this.createRouterLinks();
        this.setElementPointers();
        window.addEventListener("popstate",
            this.popHandler
        );
    }
    createPages() {
        Object.keys(RoutesEnum).forEach(key => {
            const page = new PageModel(RoutesEnum[key]);
            switch (RoutesEnum[key]) {
                case RoutesEnum.about:
                    page.classPointer = new Abou();
                    break;
                case RoutesEnum.closure:
                    page.classPointer = new Closure();
                    break;
                case RoutesEnum.protoype:
                    page.classPointer = new ProtoTypes();
                    break;
            }
            this.pages.push(page)
        })
    }
    createRouterLinks() {

        const linkContainer =  /**@type {HTMLDivElement} */(document.querySelector('#the-link-container'));

        Object.keys(RoutesEnum).forEach(routeName => {
            const a = document.createElement('a');
            a.className = 'main-links';
            a.href = '#' + routeName;
            a.innerHTML = routeName;
            linkContainer.appendChild(a)

        })
    }

    popHandler(ev) {
        const route = window.location.hash.replace("#", '');

        this.pages.forEach(page => {
            const l = page.element;
            if (l.href.includes(route)) {
                l.classList.add('active');
            } else
                l.classList.remove('active')
        })
    }
    /** @type {(link : PageModel)=> void} */
    activateRouteComponent(link) {
        // switch (link.page) {
        //     //RoutesEnum.about

        // }
    }
    setElementPointers() {
        try {
            // const mainLinksElements = /**@type {NodeListOf <HTMLAnchorElement>} */ (document.querySelectorAll('a.main-links'))
            // this.mainLinks = [...mainLinksElements].map(l => {
            //     return new PageModel(l.href.replace('#', ''), l)
            // });

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
