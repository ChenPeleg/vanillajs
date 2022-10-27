/**
 * TODO: create an unsubscribe method
 * TODO: create a snapshot/get route method
 * TODO: relate to complex routes
 */

class HashRouter {
    #subscriptions = [];
    #route = this.#requestHash();

    constructor(options) {
        window.addEventListener('popstate', (ev) => this.#popHandler(ev));
    }

    #requestHash() {
        return window.location.hash.replace('#', '');
    }

    #popHandler(ev) {
        const routeWithoutHash = this.#requestHash().replace('#', '');
        this.#next(routeWithoutHash);
    }

    #next(value) {
        this.#subscriptions.forEach((func) => {
            func(value);
        });
    }

    subscribe(callBack) {
        this.#subscriptions.push(callBack);
    }
}
