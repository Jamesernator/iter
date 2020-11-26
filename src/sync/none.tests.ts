import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import none from "./none.js";

test(
    "none returns true if no item matches the predicate",
    async (t) => {
        const isEven = (i: number) => i % 2 === 0;

        const data1 = asyncIterableOf([1, 3, 5, 7, 9]);
        const data2 = asyncIterableOf([1, 2, 3, 4, 5]);
        const data3 = asyncIterableOf([2, 4, 6, 8]);

        t.true(await none(data1, isEven));
        t.false(await none(data2, isEven));
        t.false(await none(data3, isEven));
    },
);

test(
    "none is vacuously true",
    async (t) => {
        const isEven = (i: number) => i % 2 === 0;

        t.true(await none(asyncIterableOf([]), isEven));
    },
);

test(
    "none defaults to identity for truthiness",
    async (t) => {
        const data1 = asyncIterableOf([0, false, "", null, undefined]);
        const data2 = asyncIterableOf([0, false, "bar", "", null, undefined]);
        const data3 = asyncIterableOf(["foo", {}, 12]);

        t.true(await none(data1));
        t.false(await none(data2));
        t.false(await none(data3));
    },
);

test(
    "none iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await none(iter, (i) => i === 2);
        t.is(iter.closed, 1);
    },
);

test(
    "none iterator closing on predicate error",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await t.throwsAsync(() => {
            return none(iter, (i) => {
                if (i === 2) {
                    throw new Error("Test");
                }
                return false;
            });
        });
        t.is(iter.closed, 1);
    },
);

