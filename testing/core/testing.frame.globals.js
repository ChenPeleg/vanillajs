import { GlobalData } from './testing.frame.js';
import Matcher from './testing.frame.matchers.js';
import TestObject from './testing.frame.test-class.js';

/**@type { {ref? : GlobalData}} globalDataRef*/
const glob = {};

export class TestFrameWorkGlobals {
    /**@param { GlobalData} globalDataRef*/
    constructor(globalDataRef) {
        glob.ref = globalDataRef;
    }

    /** Testing function
     * @params {string} descriptopn
     * @pramas {()=> void | never} test
     * @return void
     */
    it(desctiption, test) {
        const additionalData = {};
        const testObj = new TestObject(desctiption, test, additionalData);
        glob.ref?.tests.push(testObj);
    }
    describe(descriptopn, tests) {}
    expect(value) {
        return new Matcher(value);
    }
}
