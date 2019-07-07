import * as assert from "../lib/assert.js";
import subSequences from "./subSequences.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

export const tests = {
    async "subSequences emits all subSequences of length n"() {
        const data = [1, 2, 3, 4, 5];

        const expected = [[1, 2, 3], [2, 3, 4], [3, 4, 5]];

        assert.deepEqual(expected, await toArray(subSequences(data, 3)));
    },

    async "subSequences throws error when sequence is too short"() {
        const data1: Array<number> = [];
        const data2: Array<number> = [1, 2];

        await assert.throwsAsync(() => toArray(subSequences(data1, 3)));
        await assert.throwsAsync(() => toArray(subSequences(data2, 3)));
    },

    async "subSequences emits nothing given a subSequence too large and allowShorter=true"() {
        const data = [1, 2, 3];

        assert.deepEqual([], await toArray(subSequences(data, 1000, true)));
    },

    async "subSequences iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4, 5]);
        const seq = iterator(subSequences(iter, 3));

        await seq.next();
        await seq.next();
        await seq.return();

        assert.is(iter.closed, 1);
    },
};
