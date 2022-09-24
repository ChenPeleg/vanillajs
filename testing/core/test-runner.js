import { TestFrameWorkConsole } from './testing.frame.console.js';
import TestingFramwork from './testing.frame.core.js';
import * as fs from 'fs';
import * as path from 'path';
export class TestRunner {
    testingFramework;
    constructor() {
        this.testingFramework = new TestingFramwork();
        this.print = new TestFrameWorkConsole();
        this.log = TestFrameWorkConsole;
        this.testingFramework.init();
    }
    static async searchTestFiles(
        fileNameMatcher = ['.test.js', '.spec.js'],
        ignoreLibs = ['.git', 'node_modules']
    ) {
        const BaseDirName = path.resolve('./');
        let breaks = 0;
        const recursiveGetAllTestFiles = (dir, allFiles) => {
            if (breaks++ > 10000) {
                return;
            }
            const dirCont = fs.readdirSync(dir);
            dirCont.forEach((elm) => {
                if (ignoreLibs.some((name) => elm.includes(name))) {
                    return;
                }
                const fullFileName = path.join(dir, elm);
                const stat = fs.lstatSync(fullFileName);
                console.log(fullFileName);
                if (stat.isDirectory() && fullFileName) {
                    recursiveGetAllTestFiles(fullFileName, allFiles);
                } else if (elm.match(/.*\.(test.m?js|spec.m?js)/gi)) {
                    console.log('-- found: ', fullFileName);
                    allFiles.push(fullFileName);
                }
            });
            return allFiles;
        };
        return recursiveGetAllTestFiles(BaseDirName, []);
    }
    async runTests() {
        await console.log('Running tests');
        const testFiles = await TestRunner.searchTestFiles();
        console.log(testFiles);
        await import('../sample.test.mjs');
        this.testingFramework.globalData.tests.forEach((test) => {
            //   console.log(test.descriptopn);
            try {
                test.test();
            } catch (e) {
                console.log(e);
            }
        });
        //this.log.red('abc');
        this.log.runAnimation();
        // console.log(this.testingFramework.globalData);
    }
}
