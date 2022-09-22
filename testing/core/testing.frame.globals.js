import Matcher from './testing.frame.matchers.js'
import TestObject from './testing.frame.test.js'

class GlobalBinder {
    constructor() {}
    tests = []
    configData = {}
}

export class TestFrameWorkGlobals {
    tests = []
    /** Testing function
     * @params {string} descriptopn
     * @pramas {()=> void | never} test
     * @return void
     */
    it(desctiption, test) {
        const additionalData = {}
        const testObj = new TestObject(desctiption, test, additionalData)
    }
    expect(value) {
        return new Matcher(value)
    }
}
