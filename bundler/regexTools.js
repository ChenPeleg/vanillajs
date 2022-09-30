//
export const RegexTools = {
    ImportRegex:
        /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g,
    /**@type {(txt: string)=> {importLine: string, importPath: string}} */

    /**@type {(txt: string)=> string} */
    getImportRegex: (txt) => {
        return 2;
    },
};
