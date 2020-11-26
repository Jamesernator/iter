import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import map from "./map.js";
import toArray from "./toArray.js";

test(
    "map returns a mapped sequences",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3]);

        t.deepEqual([1, 4, 9], await toArray(map(data, (i) => i**2)));
    },
);

test(
    "the mapper function receives the index as second arg",
    async (t) => {
        const data = asyncIterableOf([11, 22, 33]);
        const expected = [[11, 0], [22, 1], [33, 2]];

        t.deepEqual(
            expected,
            await toArray(map(data, (item, idx) => [item, idx])),
        );
    },
);

test(
    "map iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));
        const seq = iterator(iter);

        await seq.next();
        await seq.return();

        t.is(1, iter.closed);
    },
);

test(
    "map iterator closing on mapper error",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await t.throwsAsync(() => toArray(
            map(iter, (value) => {
                if (value === 2) {
                    throw new Error("Test");
                }
                return value ** 2;
            }),
        ));

        t.is(1, iter.closed);
    },
);

