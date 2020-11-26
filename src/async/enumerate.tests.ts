import test from "ava";
import enumerate from "./enumerate.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import toArray from "./toArray.js";

test(
    "enumerate gives pairs of values",
    async (t) => {
        const data = asyncIterableOf([9, 11, 2, 12]);
        const expected: Array<[number, number]> = [[0, 9], [1, 11], [2, 2], [3, 12]];

        t.deepEqual(expected, await toArray(enumerate(data)));
    },
);

test(
    "enumerate iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await iter.next();
        await iter.return();

        t.is(iter.closed, 1);
    },
);
