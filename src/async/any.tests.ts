import test from "ava";
import any from "./any.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";

test(
    "any without argument returns true if a value is truthy",
    async (t) => {
        const values1 = asyncIterableOf([true, "cats", {}, 1]);
        const values2 = asyncIterableOf([false, 0, "", undefined, null]);
        const values3 = asyncIterableOf([false, 0, {}, "", undefined, null]);

        t.true(await any(values1));
        t.false(await any(values2));
        t.true(await any(values3));
    },
);

test(
    "any returns true if the predicate returns true for all of the values",
    async (t) => {
        const values = asyncIterableOf([1, 3, 5, 7]);

        t.true(await any(values, (item) => item % 2 === 1));
        t.true(await any(values, (item) => item < 5));
        t.false(await any(values, (item) => item > 10));
    },
);

test(
    "any vacuously true",
    async (t) => {
        const values = asyncIterableOf<number>([]);

        t.false(await any(values));
        t.false(await any(values, (item) => item % 2 === 0));
    },
);

test(
    "any iterator closing",
    async (t) => {
        const iter1 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        t.true(await any(iter1, (value) => value > 0));
        t.is(iter1.closed, 1);

        const iter2 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        t.false(await any(iter1, (value) => value === 12));
        t.is(iter2.closed, 0);
    },
);
