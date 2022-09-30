import { JsFile } from '../js-file-class.js';

describe('Js-file-class', () => {
    it('gets the import lines from file', () => {
        const text1 = `import * as fs from 'fs';
import { RegexTools } from './regexTools.js';import { PageModel } from "./models/page-model.js";
import { RoutesEnum } from "./models/routes.js";
import { About } from "./pages/about.js";
import { Closure } from "./pages/closure.js";
import { ProtoTypes } from "./pages/prototypes.js";
`;
        const allImports = JsFile.imports2(text1);
    });
});
