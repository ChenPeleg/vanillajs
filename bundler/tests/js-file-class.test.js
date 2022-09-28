import { JsFile } from '../js-file-class.js';

describe('Js-file-class', () => {
    it('gets the import lines from file', () => {
        const text1 = `import * as fs from 'fs'; bla bla bla_import * form 'f';`;
        const allImports = JsFile.getImportLines(text1);
        console.log(allImports);
        expect(allImports[0]).toBe(`import * as fs from 'fs'`);
    });
});
