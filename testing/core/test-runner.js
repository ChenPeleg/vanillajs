import { TestFrameWorkConsole } from './testing.frame.console.js';
import TestingFramwork from './testing.frame.core.js';

export class TestRunner {
    testingFramework;
    constructor() {
        this.testingFramework = new TestingFramwork();
        this.print = new TestFrameWorkConsole();
        this.log = TestFrameWorkConsole;
        this.testingFramework.init();
    }
    async runTests() {
        await console.log('*** running tests ***');
        await import('../sample.test.mjs');
        this.testingFramework.globalData.tests.forEach((test) => {
            //   console.log(test.descriptopn);
            try {
                test.test();
            } catch (e) {
                console.log(e);
            }
        });
        //this.log.red('abc');
        this.log.runAnimation();
        // console.log(this.testingFramework.globalData);
    }
}
