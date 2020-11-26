import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import toArray from "./toArray.js";
import zip from "./zip.js";

test(
    "zip combines sequences together into a zipped sequence",
    async (t) => {
        const data1 = asyncIterableOf([1, 2, 3, 4, 5]);
        const data2 = asyncIterableOf([6, 7, 8, 9, 10]);
        const expected = [
            [1, 6],
            [2, 7],
            [3, 8],
            [4, 9],
            [5, 10],
        ];

        t.deepEqual(expected, await toArray(zip([data1, data2])));
    },

);

test(
    "zip only takes items until the shortest sequence is complete",
    async (t) => {
        const data1 = asyncIterableOf([1, 2]);
        const data2 = asyncIterableOf([1, 2, 3, 4]);

        const expected = [[1, 1], [2, 2]];
        t.deepEqual(expected, await toArray(zip([data1, data2])));
    },
);

test(
    "zip can accept multiple iterables",
    async (t) => {
        const data1 = asyncIterableOf([1, 2, 3]);
        const data2 = asyncIterableOf([4, 5, 6]);
        const data3 = asyncIterableOf([7, 8, 9]);

        const expected = [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ];

        t.deepEqual(expected, await toArray(zip([data1, data2, data3])));
    },
);

test(
    "zip iterator closing on all sequences if closed early",
    async (t) => {
        const iter1 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));
        const iter2 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        const seq = iterator(zip([iter1, iter2]));

        await seq.next();
        await seq.next();
        await seq.return();

        t.is(iter1.closed, 1);
        t.is(iter2.closed, 1);
    },
);

test(
    "zip iterator closing open iterators on sequence consumed",
    async (t) => {
        const iter1 = new CountClosing(asyncIterableOf([1, 2]));
        const iter2 = new CountClosing(asyncIterableOf([1, 2]));
        const iter3 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await toArray(zip([iter1, iter2, iter3]));

        t.is(iter1.closed, 0);
        t.is(iter2.closed, 0);
        t.is(iter3.closed, 1);
    },
);

