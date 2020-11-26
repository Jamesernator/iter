import test from "ava";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import lastN from "./lastN.js";

test(
    "lastN returns a sequence of the correct length",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4, 5, 6, 7]);

        t.deepEqual([5, 6, 7], await lastN(data, 3));
        t.deepEqual([7], await lastN(data, 1));
        t.deepEqual([], await lastN(asyncIterableOf([]), 0));
    },
);

test(
    "lastN with sequence too short throws an error",
    async (t) => {
        await t.throwsAsync(() => lastN(asyncIterableOf([1, 2]), 3));
        await t.throwsAsync(() => lastN(asyncIterableOf([]), 1));
    },
);

test(
    "lastN with sequence too short can be return shorter sequence by passing true",
    async (t) => {
        t.deepEqual([1, 2], await lastN(asyncIterableOf([1, 2]), 3, true));
        t.deepEqual([], await lastN(asyncIterableOf([]), 3, true));
    },
);

