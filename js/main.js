import { Utils } from "./Utils/utils.js";
//import * as appComp from "./components/app-comp.js"
import { PageModel } from "./models/page-model.js";
import { RoutesEnum } from "./models/routes.js";
import { About } from "./pages/about.js";
import { Closure } from "./pages/closure.js";
import { ProtoTypes } from "./pages/prototypes.js";


class mainApp {



    constructor() {
        //this.popHandler.bind(this);
        /**@type {PageModel []} */
        this.pages = this.createPages();
        this.createRouterLinks(this.pages);
        this.setElementPointers();
        window.addEventListener("popstate",
            (ev) => this.popHandler(ev)
        );
    }
    createPages() {
        const root = /**@type {HTMLElement} */ (document.querySelector('#pages-outlet'));
        const pagesArr = [];
        Object.keys(RoutesEnum).forEach(key => {
            const page = new PageModel(RoutesEnum[key]);
            switch (RoutesEnum[key]) {
                case RoutesEnum.about:
                    page.classPointer = new About();
                    break;
                case RoutesEnum.closure:
                    page.classPointer = new Closure();
                    break;
                case RoutesEnum.protoype:
                    page.classPointer = new ProtoTypes(root);
                    break;
            }
            pagesArr.push(page)
        })
        return pagesArr;
    }
    /**@type { (pages: PageModel[]) =>void }*/
    createRouterLinks(pages) {

        const linkContainer =  /**@type {HTMLDivElement} */(document.querySelector('#the-link-container'));

        pages.forEach(page => {
            const a = document.createElement('a');
            a.className = 'main-links';
            a.href = '#' + page.name;
            a.innerHTML = page.name;
            linkContainer.appendChild(a);
            page.element = a;
        })
    }

    popHandler(ev) {
        const route = window.location.hash.replace("#", '');
        console.log(this.pages)
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
