export const TestEventTypes = {
    TEST: 1,
    BLOCKSTART: 2,
    BLOCKEND: 3,
};

class TestEvent {
    constructor(
        description,
        test,
        type = TestEventTypes.TEST,
        additionalData = {}
    ) {
        this.description = description;
        this.type = type;
        this.test = test;
        this.additionalData = additionalData;
    }
}

export default TestEvent;
