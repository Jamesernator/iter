import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import subSequences from "./subSequences.js";
import toArray from "./toArray.js";

test(
    "subSequences emits all subSequences of length n",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4, 5]);

        const expected = [[1, 2, 3], [2, 3, 4], [3, 4, 5]];

        t.deepEqual(expected, await toArray(subSequences(data, 3)));
    },
);

test(
    "subSequences throws error when sequence is too short",
    async (t) => {
        const data1 = asyncIterableOf<number>([]);
        const data2 = asyncIterableOf([1, 2]);

        await t.throwsAsync(() => toArray(subSequences(data1, 3)));
        await t.throwsAsync(() => toArray(subSequences(data2, 3)));
    },
);

test(
    "subSequences emits nothing given a subSequence too large and allowShorter=true",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3]);

        t.deepEqual([], await toArray(subSequences(data, 1000, true)));
    },
);

test(
    "subSequences iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4, 5]));
        const seq = iterator(subSequences(iter, 3));

        await seq.next();
        await seq.next();
        await seq.return();

        t.is(iter.closed, 1);
    },
);
