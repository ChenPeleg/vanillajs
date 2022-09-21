require('./testing.frame')

const runner = (...args) => ({
    run() {
        console.log('running tests')
    },
})

runner().run()
