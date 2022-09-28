import { match } from 'assert';
import * as fs from 'fs';

export class JsFile {
    constructor(filePath) {
        this.filePath = filePath;
        this.rawText = fs.readFileSync(filePath).toString();
    }
    getImports() {
        return JsFile.getImportLines(this.rawText);
    }
    static getImportLines(txt) {
        return txt.match(/\bimport[^;\n]*(;|\n)/g);
    }
}
