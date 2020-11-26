import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import toArray from "./toArray.js";
import unique from "./unique.js";

test(
    "unique doesn't emit items already emitted",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4, 1, 2, 5]);
        const expected = [1, 2, 3, 4, 5];

        t.deepEqual(expected, await toArray(unique(data)));
    },
);

test(
    "unique iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));
        const seq = iterator(unique(iter));

        await seq.next();
        await seq.next();
        await seq.return();

        t.is(iter.closed, 1);
    },
);
