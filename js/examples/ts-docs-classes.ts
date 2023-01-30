// @ts-check

/**
 * @description  execute in parallel promises by chunks
 * @type <ReturnType> : the type of data to be returned
 * @param arrayPromises : the array of promises to execute
 * @param chunks : the value of chunks
 * @returns : an array of returnType
 */
type PromiseRunner<T> = (arrayPromises: Array<() => Promise<T>>, chunks: number) => Promise<T[]>;
//let g: PromiseRunner<number>;

const runPromisesInParallelChunks = async <ReturnType>(
    /**
     * array of promises to execute
     */
    arrayPromises: Array<() => Promise<ReturnType>>,
    chunks: number
): Promise<ReturnType[]> => {
    const result: ReturnType[] = [];
    let resu: ReturnType[] = [];
    let cnt: number = 0;

    async function delayExecution(number: number) {
        return number;
    }

    const chain = async (shrinkArray: Array<() => Promise<ReturnType>>): Promise<ReturnType> => {
        if (!shrinkArray.length) {
            return new Promise<ReturnType>((resolve) => Promise.resolve());
        }
        // console.log(shrinkArray.length);
        const i: number = cnt++;
        const res: ReturnType = await shrinkArray.shift()!();
        await delayExecution(100);
        // SAVE RESULT OF THE EXECUTION OF THE FUNCTION
        result[i] = res;
        return chain(shrinkArray);
    };
    const arrChains: Array<Promise<ReturnType>> = [];
    while (chunks-- > 0 && arrayPromises.length > 0) {
        arrChains.push(chain(arrayPromises));
    }
    // RESULT IS AN ARRAY OF THE RESULT OF EACH PROMISE
    resu = await Promise.all(arrChains).then(() => result);

    return resu;
};
runPromisesInParallelChunks([], 1);
