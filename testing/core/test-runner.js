import TestingFramwork from './testing.frame.js';

export class TestRunner {
    testingFramework;
    constructor() {
        this.testingFramework = new TestingFramwork();
        this.testingFramework.initGlobals();
    }
    async runTests() {
        await console.log('*** running tests ***');
        const t = await import('../sample.test.mjs');
        console.log(this.testingFramework.testFrameWorkGlobals.tests);
    }
}
