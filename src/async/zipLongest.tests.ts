import * as assert from "../lib/assert.js";
import CountClosing from "./helpers/CountClosing.js";
import zipLongest from "./zipLongest.js";
import toArray from "./toArray.js";
import iterator from "./iterator.js";

export const tests = {
    async "zipLongest returns a sequence of zipped sets"() {
        const data1 = [1, 2, 3, 4, 5];
        const data2 = [6, 7, 8, 9, 10];
        const expected: Array<[number | undefined, number | undefined]> = [
            [1, 6],
            [2, 7],
            [3, 8],
            [4, 9],
            [5, 10],
        ];

        assert.deepEqual(expected, await toArray(zipLongest([data1, data2])));
    },

    async "zipLongest with sequences of different length fills holes with undefined"() {
        const data1 = [1, 2];
        const data2 = [1, 2, 3, 4];
        const expected = [
            [1, 1],
            [2, 2],
            [undefined, 3],
            [undefined, 4],
        ];

        assert.deepEqual(expected, await toArray(zipLongest([data1, data2])));
    },

    async "zipLongest can accept more than two iterables"() {
        const data1 = [1, 2, 3];
        const data2 = [4, 5, 6];
        const data3 = [7, 8, 9, 10];

        const expected = [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [undefined, undefined, 10],
        ];

        assert.deepEqual(expected, await toArray(zipLongest([data1, data2, data3])));
    },

    async "zipLongest iterator closing all if early"() {
        const iter1 = new CountClosing([1, 2]);
        const iter2 = new CountClosing([1, 2, 3, 4]);

        const seq = iterator(zipLongest([iter1, iter2]));

        await seq.next();
        await seq.next();
        await seq.next();
        await seq.return();

        assert.is(iter1.closed, 0);
        assert.is(iter2.closed, 1);
    },
};

