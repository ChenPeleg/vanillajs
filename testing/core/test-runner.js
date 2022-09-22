import TestingFramwork from './testing.frame.js';

export class TestRunner {
    testingFramework;
    constructor() {
        this.testingFramework = new TestingFramwork();
        //  this.testingFramework.
    }
    run() {
        console.log('running tests...');
    }
}
