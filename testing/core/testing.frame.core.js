import { TestFrameWorkGlobals } from './testing.frame.globals.js';
import TestEvent from './testing.frame.test-event.js';

export class GlobalData {
    constructor() {}
    /**@type {TestEvent[]} */
    tests = [];
    configData = {};
}

class TestingFramework {
    constructor() {
        this.globalData = new GlobalData();
        this.testFrameWorkGlobals = new TestFrameWorkGlobals(this.globalData);
    }
    init() {
        globalThis.expect = this.testFrameWorkGlobals.expect;
        globalThis.it = this.testFrameWorkGlobals.it;
        globalThis.describe = this.testFrameWorkGlobals.describe;
    }
}

export default TestingFramework;
