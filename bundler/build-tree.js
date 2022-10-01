import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import { JsFile } from './js-file-class.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BaseDirName = path.resolve('./');

/**@typedef {{fileContent : string, filePath : string, importPaths : string []}} FileData */

const getFullFilePath = (contentFilePath, relativeImport) => {
    const fullFileName = path.join(BaseDirName, relativeImport);
    return fullFileName;
    //__dirname;
};
export const buildTree = (entryPoint = './entry.js') => {
    const thisProjectPath = path.resolve('./');
    const thisScriptPath = __dirname;
    const entryPointPath = path.resolve(thisScriptPath, entryPoint);
    const file = new JsFile(entryPointPath);
};
