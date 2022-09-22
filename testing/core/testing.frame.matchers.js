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

export default Matcher
