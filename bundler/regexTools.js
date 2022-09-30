export const RegexTools = {
    ImportRegex:
        /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g,

    getImportRegex: (txt) => {
        const importRGX =
            /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g;
        const importLines = txt
            .split('import')
            .filter((t) => t)
            .map((t) => 'import' + t);

        importLines.forEach((importLine, index) => {
            const line = importLine.matchAll(importRGX);
            console.log('\n\n', 'line ' + index, importLine);
            for (const matchPart of line) {
                console.log(matchPart);
            }
        });
    },
};
