import test from "ava";
import flat from "./flat.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import toArray from "./toArray.js";

test(
    "flat emits items from both sequences in sequence",
    async (t) => {
        const expected1 = [1, 2, 3, 4, 5, 6];

        t.deepEqual(expected1, await toArray(flat(asyncIterableOf([
            asyncIterableOf([1, 2, 3]),
            asyncIterableOf([4, 5, 6]),
        ]))));

        const expected2 = [1, 2, 3, 4];

        t.deepEqual(expected2, await toArray(flat(asyncIterableOf([
            asyncIterableOf([1, 2, 3, 4]),
            asyncIterableOf([]),
        ]))));
        t.deepEqual(expected2, await toArray(flat(asyncIterableOf([
            asyncIterableOf([]),
            asyncIterableOf([1, 2, 3, 4]),
        ]))));

        t.deepEqual([], await toArray(flat(asyncIterableOf([
            asyncIterableOf([]),
            asyncIterableOf([]),
        ]))));
    },
);

test(
    "flat works with multiple flatenations",
    async (t) => {
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        t.deepEqual(expected, await toArray(flat(asyncIterableOf([
            asyncIterableOf([1, 2, 3]),
            asyncIterableOf([4, 5, 6]),
            asyncIterableOf([7, 8, 9]),
        ]))));
    },
);

test(
    "flat can reuse the same iterable multiple times",
    async (t) => {
        const x = asyncIterableOf([1, 2]);
        const expected = [1, 2, 1, 2, 1, 2, 1, 2];

        t.deepEqual(expected, await toArray(flat([x, x, x, x])));
    },
);

test(
    "flat iterator closing",
    async (t) => {
        const iter1 = new CountClosing(asyncIterableOf([1, 2]));
        const iter2 = new CountClosing(asyncIterableOf([1, 2, 3]));
        const iter3 = new CountClosing(asyncIterableOf([1, 2]));

        const seq = iterator(flat([iter1, iter2, iter3]));

        for (let i = 0; i < 4; i += 1) {
            await seq.next();
        }
        await seq.return();

        t.is(iter1.closed, 0);
        t.is(iter2.closed, 1);
        t.is(iter3.closed, 0);
    },
);
