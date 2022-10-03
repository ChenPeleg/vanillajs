/**
 * @typedef {import('./js-file-class').ExportLine} ExportLine
 * @typedef {import('./js-file-class').ExportLine} ImportLine
 */
const RegexTools = {
    ImportRegex:
        /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])(\n|\t|;)/g,
    ExportRegex: /export\s(const|let|function|var|default|class)\s([^)}={;]+)/g,

    ImportsNamesIndex: 2,
    ImportRegexURLPathIndex: 4,
    /**@type {(txt: sting)=>{ importedNames: string, importPath: string, importLine: string} []} */
    getImportLines(txt) {
        const importLines = txt
            .split('import')
            .filter((t) => t)
            .map((t) => 'import' + t);

        return importLines.map((importLine) => {
            const lineGroupsMatch = Array.from(
                importLine.matchAll(this.ImportRegex)
            );
            const importedNames = lineGroupsMatch[0][this.ImportsNamesIndex];
            const importPath = lineGroupsMatch[0][this.ImportRegexURLPathIndex];
            const allOfTheLine = lineGroupsMatch[0][0];
            return { importedNames, importPath, importLine: allOfTheLine };
        });
    },
    /**@type {(txt:string)=>ExportLine[]} */
    getExportLines(txt) {
        const exportLines = txt
            .split('export')
            .filter((t) => t)
            .map((t) => 'export' + t);

        return exportLines.map(
            (line) =>
                Array.from(line.matchAll(this.ExportRegex))
                    .filter((ex) => ex)
                    .map((ex) => ({
                        exportedExpression: ex[0],
                        exportType: ex[1],
                        exportValue: ex[2],
                        line,
                    }))[0]
        );
    },
};
export { RegexTools };
