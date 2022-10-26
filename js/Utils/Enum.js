/**
 * This is an enum validator function, that
 * turns arrays and objects to enums.
 * @param {Record<string,any> | Array<string>} enumObj
 * @param {'number' | 'string'} type='number'
 */
export const Enum = (enumObj, type = 'number') => {
    if (Array.isArray(enumObj)) {
        const newObj = {};
        enumObj.forEach((el, i) => {
            newObj[el] = type === 'number' ? i : el;
        });
        return newObj;
    }
    const keys = Object.keys(enumObj);
    if (type === 'string') {
        keys.forEach((key) => {
            enumObj[key] = key;
        });
        return enumObj;
    }
    const existingNumbers = /**@type {Set<number>} */ (new Set());
    keys.forEach((key) => {
        const number = enumObj[key];
        enumObj[key] = Number(number);
        if (!existingNumbers.has(number)) {
            existingNumbers.add(number);
        } else {
            enumObj[key] = NaN;
        }
        let maxNumber = [...existingNumbers].reduce((p, c) => (p < c ? c : p));
        keys.forEach(
            (key) =>
                (enumObj[key] = isNaN(enumObj[key])
                    ? enumObj[key]
                    : ++maxNumber)
        );
        return enumObj;
    });
};

export const EnumValidator = (testEnum) => {
    const values = Object.values(testEnum);
    if (new Set(values).size !== values.length) {
        throw {
            message: 'some of the enum values are the same!',
        };
    }

    //return testEnum;
};
