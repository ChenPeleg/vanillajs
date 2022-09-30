import { JsFile } from '../js-file-class.js';

describe('Js-file-class', () => {
    it('general gets the import lines from file', () => {
        const text1 = `import * as fs from 'fs';
import { RegexTools } from './regexTools.js';`;
        const allImports = JsFile.getImportLinesWithData(text1);
        expect(JSON.stringify(allImports)).toBe(
            JSON.stringify([
                {
                    importedNames: undefined,
                    importPath: 'fs',
                    importLine: "import * as fs from 'fs';\n",
                },
                {
                    importedNames: ' { RegexTools }',
                    importPath: './regexTools.js',
                    importLine: "import { RegexTools } from './regexTools.js';",
                },
            ])
        );
    });
    it('gets ', () => {});
});
