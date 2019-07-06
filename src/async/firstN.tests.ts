import * as assert from "../lib/assert.js";
import firstN from "./firstN.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    async "firstN returns an array of the first N elements"() {
        const data = [12, 9, 2, 3, 9];
        assert.deepEqual([12, 9, 2], await firstN(data, 3));
    },

    async "firstN with count too short throws an error"() {
        const data = [1, 2, 3];

        await assert.throwsAsync(() => firstN(data, 5));
    },

    async "firstN with count too short can be supressed by passing true"() {
        const data = [1, 2, 3];

        assert.deepEqual([1, 2, 3], await firstN(data, 5, true));
    },

    async "firstN iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);

        await firstN(iter, 2);
        assert.is(1, iter.closed);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        await firstN(iter, 5, true);
        assert.is(iter2.closed, 0);
    },
};
