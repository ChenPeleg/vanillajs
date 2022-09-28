import { MyExp } from './import1';

const entry = () => {
    const a = MyExp.a;
    console.log('entry');
    console.log('my exp', a);
};

entry();
