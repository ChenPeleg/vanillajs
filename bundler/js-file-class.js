import * as fs from 'fs';
import { RegexTools } from './regexTools.js';

export class JsFile {
    constructor(filePath) {
        this.filePath = filePath;
        this.rawText = fs.readFileSync(filePath).toString();
    }
    getImports() {
        return JsFile.getImportLines(this.rawText);
    }
    static getImportLinesWithData(txt) {
        const importLines = RegexTools.getImportLines(txt);
        return importLines;
    }
}
