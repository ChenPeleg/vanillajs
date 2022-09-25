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
     * @params {string} descriptopn
     * @pramas {()=> void | never} test
     * @return void
     */
    it(desctiption, test) {
        const additionalData = {};
        const testObj = new TestEvent(
            desctiption,
            test,
            TestEventTypes.TEST,
            additionalData
        );
        glob.ref?.tests.push(testObj);
    }
    describe(desctiption, tests) {
        const additionalData = {};
        const BLOCKSTART = new TestEvent(
            desctiption,
            null,
            TestEventTypes.BLOCKSTART
        );
        glob.ref?.tests.push(BLOCKSTART);
        tests();
        const BLOCKEND = new TestEvent(
            desctiption,
            null,
            TestEventTypes.BLOCKEND
        );
        glob.ref?.tests.push(BLOCKEND);
    }
    expect(value) {
        return new Matcher(value);
    }
}
