const RegexTools = {
    ImportRegex:
        /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])(\n|\t|;)/g,
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
};

export { RegexTools };
