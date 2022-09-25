export const TestEventTypes = {
    TEST: 1,
    BLOCKSTART: 2,
    BLOCKEND: 3,
};

class TestEvent {
    constructor(
        descriptopn,
        test,
        type = TestEventTypes.TEST,
        additionalData = {}
    ) {
        this.descriptopn = descriptopn;
        this.type = type;
        this.test = test;
        this.additionalData = additionalData;
    }
}

export default TestEvent;
