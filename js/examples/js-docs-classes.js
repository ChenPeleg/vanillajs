//@ts-check

class Parent {
    /**
     * @param {string} a ...
     * @param {number} b ...
     */
    method(a, b) {
        // ...
    }
}

class Child extends Parent {
    /** @type {Parent['method']} */
    


    method(a, b) {
        super.method(a, b);
        // ... do extra stuff ...
    }
}
