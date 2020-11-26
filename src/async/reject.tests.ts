import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import reject from "./reject.js";
import toArray from "./toArray.js";

test(
    "reject filters items for which the predice returns true",
    async (t) => {
        const data1 = asyncIterableOf([1, 2, 3, 4, 5, 6]);

        t.deepEqual([1, 3, 5], await toArray(reject(data1, (i) => i % 2 === 0)));

        const data2 = asyncIterableOf([1, 2, 3, 4]);

        t.deepEqual([3, 4], await toArray(reject(data2, (i, idx) => idx < 2)));
    },
);

test(
    "reject iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));
        const seq = iterator(reject(iter, (i) => i % 2 === 0));

        await seq.next();
        await seq.next();
        await seq.return();

        t.is(iter.closed, 1);
    },
);

test(
    "reject iterator closing on predicate error",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await t.throwsAsync(() => toArray(reject(iter, (i) => {
            if (i === 3) {
                throw new Error("Test");
            }
            return false;
        })));

        t.is(iter.closed, 1);
    },
);

