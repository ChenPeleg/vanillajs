const RegexTools = {
    ImportRegex:
        /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g,
    ImportsNames: 4,
    ImportRegexURLPath: 4,

    getImportRegex(txt) {
        const importLines = txt
            .split('import')
            .filter((t) => t)
            .map((t) => 'import' + t);

        importLines.map((importLine, index) => {
            const line = importLine.matchAll(importRGX);
            // console.log('\n\n', 'line ' + index, importLine);
            // for (const matchPart of line) {
            //     console.log(matchPart);
            // }
            return { importLine };
        });
    },
};

export { RegexTools };
