import { JsFile } from '../js-file-class.js';

describe('Js-file-class', () => {
    it('gets the import lines from file', () => {
        const text1 = `import * as fs from 'fs';
import { RegexTools } from './regexTools.js';`;
        const allImports = JsFile.imports2(text1);
    });
});
