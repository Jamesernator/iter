import * as assert from "../lib/assert.js";
import enumerate from "./enumerate.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    async "enumerate gives pairs of values"() {
        const data = [9, 11, 2, 12];
        const expected: Array<[number, number]> = [[0, 9], [1, 11], [2, 2], [3, 12]];

        assert.deepEqual(expected, await toArray(enumerate(data)));
    },

    async "enumerate iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);

        await iter.next();
        await iter.return();

        assert.is(iter.closed, 1);
    },
};
