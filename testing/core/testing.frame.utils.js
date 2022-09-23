export const TestFrameWorkUtils = {
    /**@type {(ms: number, resolveWith? : any)=>Promise<any>} */
    async wait(ms, resolveWith = true) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(resolveWith);
            }, ms);
        });
    },
};
