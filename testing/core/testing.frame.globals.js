import { GlobalData } from './testing.frame.core.js';
import Matcher from './testing.frame.matchers.js';
import TestEvent, { TestEventTypes } from './testing.frame.test-event.js';

/**@type { {ref? : GlobalData}} globalDataRef*/
const glob = {};

export class TestFrameWorkGlobals {
    /**@param { GlobalData} globalDataRef*/
    constructor(globalDataRef) {
        glob.ref = globalDataRef;
    }

    /** Testing function
     * @params {string} description
     * @prams {()=> void | never} test
     * @return void
     */
    it(description, test) {
        const additionalData = {};
        const testObj = new TestEvent(
            description,
            test,
            TestEventTypes.TEST,
            additionalData
        );
        glob.ref?.tests.push(testObj);
    }
    describe(description, tests) {
        const additionalData = {};
        const BLOCKSTART = new TestEvent(
            description,
            null,
            TestEventTypes.BLOCKSTART
        );
        glob.ref?.tests.push(BLOCKSTART);
        tests();
        const BLOCKEND = new TestEvent(
            description,
            null,
            TestEventTypes.BLOCKEND
        );
        glob.ref?.tests.push(BLOCKEND);
    }
    expect(value) {
        return new Matcher(value);
    }
}
