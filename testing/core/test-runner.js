import TestingFramwork from './testing.frame.js';

export class TestRunner {
    testingFramework;
    constructor() {
        this.testingFramework = new TestingFramwork();
        this.testingFramework.init();
    }
    async runTests() {
        await console.log('*** running tests ***');
        await import('../sample.test.mjs');
        this.testingFramework.globalData.tests.forEach((test) => {
            console.log(test.descriptopn);
            try {
                test.test();
            } catch (e) {
                console.log(e);
            }
        });

        // console.log(this.testingFramework.globalData);
    }
}
