import { TestFrameWorkGlobals } from './testing.frame.globals.js';
import TestObject from './testing.frame.test.js';


export class GlobalData {
    constructor() {}
    /**@type {TestObject[]} */
    tests = [];
    configData = {};
}

class TestingFramwork {
    constructor() {
        this.globalData = new GlobalData();
        this.testFrameWorkGlobals = new TestFrameWorkGlobals(this.globalData)  
        
       
    }
    init() {
        globalThis.expect = this.testFrameWorkGlobals.expect;
        globalThis.it = this.testFrameWorkGlobals.it; 
        globalThis.describe = this.testFrameWorkGlobals.describe;
    }
}

export default TestingFramwork;
