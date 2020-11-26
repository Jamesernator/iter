import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import pairWise from "./pairWise.js";
import toArray from "./toArray.js";

test(
    "pairWise returns pairs of values from the sequence",
    async (t) => {
        const data1 = asyncIterableOf([1, 2, 3, 4, 5]);
        const expected1 = [[1, 2], [2, 3], [3, 4], [4, 5]];

        t.deepEqual(expected1, await toArray(pairWise(data1)));

        const data2 = asyncIterableOf([1, 2]);
        const expected2 = [[1, 2]];

        t.deepEqual(expected2, await toArray(pairWise(data2)));
    },
);

test(
    "pairWise throws error on sequence of insufficient length",
    async (t) => {
        const data1 = asyncIterableOf([1]);

        await t.throwsAsync(() => toArray(pairWise(data1)));

        const data2 = asyncIterableOf<number>([]);

        await t.throwsAsync(() => toArray(pairWise(data2)));
    },
);

test(
    "pairWise doesn't throw error on sequence of insufficient length if allowShorter is true",
    async (t) => {
        const data1 = asyncIterableOf([1]);

        t.deepEqual([], await toArray(pairWise(data1, true)));

        const data2 = asyncIterableOf<number>([]);

        t.deepEqual([], await toArray(pairWise(data2, true)));
    },
);

test(
    "pairWise iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));
        const seq = iterator(pairWise(iter));

        await seq.next();
        await seq.next();
        await seq.return();

        t.is(iter.closed, 1);
    },
);

