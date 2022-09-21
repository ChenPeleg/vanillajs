/** Testing function
 * @params {string} descriptopn
 * @pramas {()=> void | never} test
 * @return void
 */
function it(desctiption, test) {}
function expect(value) {
    return new Matcher(value)
}
class Matcher {
    constructor(value) {
        this.value = value
    }
    toBe(match) {
        if (this.value === match) {
            return this.matched()
        }
        const message = `${this.value} is not equal to ${match}`
        return this.mismatch(message)
    }
    matched() {
        return true
    }
    mismatch(messaage) {
        throw new Error(messaage)
    }
}

export const TestingFramwork = () => {}
