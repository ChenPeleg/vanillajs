import * as fs from 'fs';
import { RegexTools } from './regexTools.js';

/**@typedef {{ importedNames: string, importPath: string, importLine: string}} ImportLine  */

export class JsFile {
    constructor(filePath) {
        this.filePath = filePath;
        this.rawText = fs.readFileSync(filePath).toString();
        /**@type {ImportLine []} */
        this.importFrom = JsFile.getImportLinesWithData(this.rawText);
    }
    static getImportLinesWithData(txt) {
        const importLines = RegexTools.getImportLines(txt);
        return importLines;
    }
    /**
     * @param {string} txt
     * @param {ImportLine[]} importLines
     * @returns {string} */
    static deleteImportLines(txt, importLines) {
        let textWithoutImports = txt;

        importLines.forEach((line) => {
            textWithoutImports = textWithoutImports.replace(
                line.importLine,
                ''
            );
        });

        return textWithoutImports;
    }
}
