import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";
import concat from "./concat.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

export const tests = {
    async "concat emits items from both sequences in sequence"() {
        const expected1 = [1, 2, 3, 4, 5, 6];

        assert.deepEqual(expected1, await toArray(concat([[1, 2, 3], [4, 5, 6]])));

        const expected2 = [1, 2, 3, 4];

        assert.deepEqual(expected2, await toArray(concat([[1, 2, 3, 4], []])));
        assert.deepEqual(expected2, await toArray(concat([[], [1, 2, 3, 4]])));

        assert.deepEqual([], await toArray(concat([[], []])));
    },

    async "concat works with multiple concatenations"() {
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        assert.deepEqual(expected, await toArray(concat([[1, 2, 3], [4, 5, 6], [7, 8, 9]])));
    },

    async "concat can reuse the same iterable multiple times"() {
        const x = [1, 2];
        const expected = [1, 2, 1, 2, 1, 2, 1, 2];

        assert.deepEqual(expected, await toArray(concat([x, x, x, x])));
    },

    async "concat iterator closing"() {
        const iter1 = new CountClosing([1, 2]);
        const iter2 = new CountClosing([1, 2, 3]);
        const iter3 = new CountClosing([1, 2]);

        const seq = iterator(concat([iter1, iter2, iter3]));

        for (let i = 0; i < 4; i += 1) {
            await seq.next();
        }
        await seq.return();

        assert.is(iter1.closed, 0);
        assert.is(iter2.closed, 1);
        assert.is(iter3.closed, 0);
    },
};
