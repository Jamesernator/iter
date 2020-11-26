import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import toArray from "./toArray.js";
import zipLongest from "./zipLongest.js";

test(
    "zipLongest returns a sequence of zipped sets",
    async (t) => {
        const data1 = asyncIterableOf([1, 2, 3, 4, 5]);
        const data2 = asyncIterableOf([6, 7, 8, 9, 10]);
        const expected: Array<[number | undefined, number | undefined]> = [
            [1, 6],
            [2, 7],
            [3, 8],
            [4, 9],
            [5, 10],
        ];

        t.deepEqual(expected, await toArray(zipLongest([data1, data2])));
    },
);

test(
    "zipLongest with sequences of different length fills holes with undefined",
    async (t) => {
        const data1 = asyncIterableOf([1, 2]);
        const data2 = asyncIterableOf([1, 2, 3, 4]);
        const expected = [
            [1, 1],
            [2, 2],
            [undefined, 3],
            [undefined, 4],
        ];

        t.deepEqual(expected, await toArray(zipLongest([data1, data2])));
    },
);

test(
    "zipLongest can accept more than two iterables",
    async (t) => {
        const data1 = asyncIterableOf([1, 2, 3]);
        const data2 = asyncIterableOf([4, 5, 6]);
        const data3 = asyncIterableOf([7, 8, 9, 10]);

        const expected = [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [undefined, undefined, 10],
        ];

        t.deepEqual(expected, await toArray(zipLongest([data1, data2, data3])));
    },
);

test(
    "zipLongest iterator closing all if early",
    async (t) => {
        const iter1 = new CountClosing(asyncIterableOf([1, 2]));
        const iter2 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        const seq = iterator(zipLongest([iter1, iter2]));

        await seq.next();
        await seq.next();
        await seq.next();
        await seq.return();

        t.is(iter1.closed, 0);
        t.is(iter2.closed, 1);
    },
);
