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
    static imports2(txt) {
        const importLines = RegexTools.getImportRegex(txt);
    }
    static getImportLines(txt) {
        return txt.match(/\bimport[^;\n]*(;|\n)/g);
    }
}
