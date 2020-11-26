import test from "ava";
import firstN from "./firstN.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";

test(
    "firstN returns an array of the first N elements",
    async (t) => {
        const data = asyncIterableOf([12, 9, 2, 3, 9]);
        t.deepEqual([12, 9, 2], await firstN(data, 3));
    },
);

test(
    "firstN with count too short throws an error",
    async ( t) => {
        const data = asyncIterableOf([1, 2, 3]);

        await t.throwsAsync(() => firstN(data, 5));
    },
);

test(
    "firstN with count too short can be supressed by passing true",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3]);

        t.deepEqual([1, 2, 3], await firstN(data, 5, true));
    },
);

test(
    "firstN iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await firstN(iter, 2);
        t.is(1, iter.closed);

        const iter2 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await firstN(iter, 5, true);
        t.is(iter2.closed, 0);
    },
);

