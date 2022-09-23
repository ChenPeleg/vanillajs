import { TestFrameWorkUtils } from './testing.frame.utils.js';

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    fg: {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
    },
    bg: {
        BGblack: '\x1b[40m',
        BGred: '\x1b[41m',
        BGgreen: '\x1b[42m',
        BGyellow: '\x1b[43m',
        BGblue: '\x1b[44m',
        BGmagenta: '\x1b[45m',
        BGcyan: '\x1b[46m',
        BGwhite: '\x1b[47m',
    },
};

/**@typedef {{color? : keyof typeof colors.fg, background? : keyof typeof colors.bg  }} logOptions */
export class TestFrameWorkConsole {
    constructor() {}
    static log(...args) {
        console.log(...args);
    }
    static green(text) {
        TestFrameWorkConsole.print(text, { color: 'green' });
    }
    static red(text) {
        TestFrameWorkConsole.print(text, { color: 'red' });
    }
    /** @type {(text : string, options?: logOptions)=>void} */
    static print(text, options = undefined) {
        console.log(TestFrameWorkConsole.paint(text, options));
    }
    /** @type {(text : string, options?: logOptions)=>string} */

    static paint(text, options = undefined) {
        const fg = options?.color ? colors.fg[options.color] : '';
        const bg = options?.background ? colors.bg[options.background] : '';
        const reset = colors.reset;
        return `${fg}${bg}${text}${reset}`;
    }
    static rewrite(text) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(text);
    }
    static async runAnimation() {
        const c = TestFrameWorkConsole;
        const wait = TestFrameWorkUtils.wait;
        c.rewrite(c.paint('green', { color: 'green' }));
        await wait(400);
        c.rewrite(c.paint('red', { color: 'red' }));
        await wait(400);
        c.rewrite(c.paint('yellow', { color: 'yellow' }));
        await wait(400);
    }
}
