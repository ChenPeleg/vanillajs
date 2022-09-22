import { TestFrameWorkGlobals } from './testing.frame.globals.js';

class TestingFramwork {
    constructor() {
        this.testFrameWorkGlobals = new TestFrameWorkGlobals();
    }
    initGlobals() {
        globalThis.expect = this.testFrameWorkGlobals.expect;
        globalThis.it = this.testFrameWorkGlobals.it;
        globalThis.describe = this.testFrameWorkGlobals.describe;
    }
}

export default TestingFramwork;
