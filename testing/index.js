import { TestRunner } from './core/test-runner.js';

const runner = new TestRunner();

const testfiles =
    process.argv
        .filter((a) => a.includes('testfiles='))[0]
        ?.replace('testfiles=', '') || 'test.m?js|spec.m?j';

const ignore =
    process.argv
        .filter((a) => a.includes('ignore='))[0]
        ?.replace('ignore=', '') || '.git|node_modules';

const filter =
    process.argv
        .filter((a) => a.includes('filter='))[0]
        ?.replace('filter=', '') || '';
runner.runTests({ ignore, testfiles, filter });

// console.log ('yes')
// export default {}
