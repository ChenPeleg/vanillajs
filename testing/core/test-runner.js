import { TestFrameWorkConsole } from './testing.frame.console.js';
import TestingFramwork from './testing.frame.core.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { TestEventTypes } from './testing.frame.test-event.js';
import { waitForDebugger } from 'inspector';
import { TestFrameWorkUtils } from './testing.frame.utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

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
        let foldersScaned = 0;
        const recursiveGetAllTestFiles = (dir, allFiles) => {
            if (breaks++ > 10000) {
                return;
            }
            const dirCont = fs.readdirSync(dir);
            dirCont.forEach((elm, i) => {
                if (ignoreLibs.some((name) => elm.includes(name))) {
                    return;
                }
                const fullFileName = path.join(dir, elm);
                const stat = fs.lstatSync(fullFileName);
                if (stat.isDirectory() && fullFileName) {
                    recursiveGetAllTestFiles(fullFileName, allFiles);
                } else if (elm.match(/.*\.(test.m?js|spec.m?js)/gi)) {
                    allFiles.push(fullFileName);
                    return;
                }
            });

            return allFiles;
        };
        return recursiveGetAllTestFiles(BaseDirName, []);
    }
    async runTests() {
        console.log('Running tests');
        this.print.circleAnimation('ON', 'Searching For Files');
        const testFiles = await TestRunner.searchTestFiles();
        await TestFrameWorkUtils.wait(500);
        this.print.circleAnimation(
            'OFF',
            `Found ${testFiles.length} test files`
        );
        console.log(' ');

        for (const fileName of testFiles) {
            await import(
                path.relative(__dirname, fileName).replace(/\\/g, '/')
            );
        }
        const descriptions = [];
        const passed = [];
        const failed = [];
        this.testingFramework.globalData.tests.forEach((test) => {
            const indentation = ' '.repeat(descriptions.length * 4);

            switch (test.type) {
                case TestEventTypes.BLOCKSTART:
                    console.log(indentation + test.descriptopn);
                    descriptions.push(test.descriptopn);
                    return;
                case TestEventTypes.BLOCKEND:
                    descriptions.pop();
                    return;
                case TestEventTypes.TEST:
                    console.log(indentation + test.descriptopn);
            }
            try {
                test.test();
            } catch (e) {
                console.log(indentation + e);
                failed.push(test.descriptopn + ' ' + e);
                return;
            }
            passed.push(test.descriptopn);
        });
        if (failed.length) {
            console.log(
                TestFrameWorkConsole.paint(
                    `${failed.length} Tests ${TestFrameWorkConsole.paint(
                        ' FAILED ',
                        {
                            color: 'white',
                            background: 'BGred',
                        }
                    )}`
                )
            );
        }
        console.log(
            TestFrameWorkConsole.paint(
                `${passed.length} Tests ${TestFrameWorkConsole.paint(
                    ' PASSED ',
                    {
                        color: 'white',
                        background: 'BGgreen',
                    }
                )}`,
                { background: 'BGblack' }
            )
        );
    }
}
