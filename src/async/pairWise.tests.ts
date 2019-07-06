import * as assert from "../lib/assert.js";
import pairWise from "./pairWise.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

export const tests = {
    async "pairWise returns pairs of values from the sequence"() {
        const data1 = [1, 2, 3, 4, 5];
        const expected1 = [[1, 2], [2, 3], [3, 4], [4, 5]];

        assert.deepEqual(expected1, await toArray(pairWise(data1)));

        const data2 = [1, 2];
        const expected2 = [[1, 2]];

        assert.deepEqual(expected2, await toArray(pairWise(data2)));
    },

    async "pairWise throws error on sequence of insufficient length"() {
        const data1 = [1];

        await assert.throwsAsync(() => toArray(pairWise(data1)));

        const data2: Array<number> = [];

        await assert.throwsAsync(() => toArray(pairWise(data2)));
    },

    async "pairWise doesn't throw error on sequence of insufficient length if allowShorter is true"() {
        const data1 = [1];

        assert.deepEqual([], await toArray(pairWise(data1, true)));

        const data2: Array<number> = [];

        assert.deepEqual([], await toArray(pairWise(data2, true)));
    },

    async "pairWise iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(pairWise(iter));

        await seq.next();
        await seq.next();
        await seq.return();

        assert.is(iter.closed, 1);
    },
};
