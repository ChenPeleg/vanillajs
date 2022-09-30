const RegexTools = {
    ImportRegex:
        /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g,
    ImportsNamesIndex: 2,
    ImportRegexURLPathIndex: 4,
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
            return { importedNames, importPath, importLine };
        });
    },
};

export { RegexTools };
