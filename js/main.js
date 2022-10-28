import { PageModel } from './models/page-model.js';
import { RoutesEnum } from './models/routes.js';
import { About } from './pages/about.js';
import { Closure } from './pages/closure.js';
import { ProtoTypes } from './pages/prototypes.js';
import { HashRouter } from '../router/router.js';

class mainApp {
    constructor() {
        /**@type {PageModel []} */
        this.pages = this.createPages();
        this.createRouterLinks(this.pages);
        this.router = new HashRouter();
        this.router.subscribe((hash) => {
            this.popHandler(hash);
        });
    }

    createPages() {
        const root = /**@type {HTMLElement} */ (
            document.querySelector('#pages-outlet')
        );
        const pagesArr = [];
        Object.keys(RoutesEnum).forEach((key) => {
            const page = new PageModel(RoutesEnum[key]);
            switch (RoutesEnum[key]) {
                case RoutesEnum.about:
                    page.componentPointer = new About();
                    break;
                case RoutesEnum.closure:
                    page.componentPointer = new Closure();
                    break;
                case RoutesEnum.protoype:
                    page.componentPointer = new ProtoTypes(root);
                    break;
            }
            pagesArr.push(page);
        });
        return pagesArr;
    }

    /**@type { (pages: PageModel[]) =>void }*/
    createRouterLinks(pages) {
        const linkContainer = /**@type {HTMLDivElement} */ (
            document.querySelector('#the-link-container')
        );

        pages.forEach((page) => {
            const a = document.createElement('a');
            a.className = 'main-links';
            a.href = '#' + page.name;
            a.innerHTML = page.name;
            linkContainer.appendChild(a);
            page.element = a;
        });
    }

    popHandler(_ev) {
        const route = window.location.hash.replace('#', '');

        this.pages.forEach((page) => {
            const l = page.element;
            l.componentPointer = l.componentPointer || {};
            if (l.href.includes(route)) {
                page.isActive = true;
                l.classList.add('active');
            } else {
                page.isActive = false;
                l.classList.remove('active');
            }
        });
    }
}

export const app = new mainApp();
