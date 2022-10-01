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
                    importLine: "import * as fs from 'fs';",
                },
                {
                    importedNames: ' { RegexTools }',
                    importPath: './regexTools.js',
                    importLine: "import { RegexTools } from './regexTools.js';",
                },
            ])
        );
    });
    it('deletes import lines from the text of the file ', () => {
        const text1 = `import * as fs from 'fs';
import { RegexTools } from './regexTools.js'; this is the rest of the file `;
        const lineImports = JsFile.getImportLinesWithData(text1);
        expect(
            JsFile.deleteImportLines(text1, lineImports).replace('\n', '')
        ).toBe(' this is the rest of the file ');
    });
    it('finds the export lines in the file last', () => {
        const text1 = `export const fun = () => {return 4}; export class Bricks {} `;
        const lineImports = JsFile.getExportLines(text1);
        expect(
            JsFile.deleteImportLines(text1, lineImports).replace('\n', '')
        ).toBe(' this is the rest of the file ');
    });
});
