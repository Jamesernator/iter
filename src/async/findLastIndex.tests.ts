import test from "ava";
import findLastIndex from "./findLastIndex.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";

test(
    "findLastIndex returns the last index of a given item",
    async (t) => {
        const val = { x: 10, y: 20 };
        const data = asyncIterableOf(
            [1, { x: 10, y: "banana" }, 2, "banana", val, NaN, ""],
        );

        t.is(4, await findLastIndex(
            data,
            (item) => typeof item === "object" && item.x === 10,
        ));
        t.is(2, await findLastIndex(data, (item) => item === 2));
    },
);

test(
    "findLastIndex throws an error if no item is found",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4]);

        await t.throwsAsync(() => findLastIndex(data, (x) => x === 42));
    },
);

test(
    "findLastIndex with no argument returns the last index for which the value is truthy",
    async (t) => {
        const data = asyncIterableOf([0, false, undefined, "", null, "foo", 0, null, "banana", 0]);

        t.is(8, await findLastIndex(data));
    },
);

test(
    "findLastIndex returns the default value if not found",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4]);

        t.is(-1, await findLastIndex(data, -1, (x) => x > 12));
        t.is(null, await findLastIndex(data, null, (x) => x > 12));
    },
);

test(
    "findLastIndex iterator closing",
    async (t) => {
        const iter1 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await findLastIndex(iter1, 99, (x) => x > 5);
        t.is(0, iter1.closed);

        const iter2 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await findLastIndex(iter2, 99, (x) => x === 2);
        t.is(0, iter2.closed);

        const iter3 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));
        await t.throwsAsync(() => findLastIndex(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        t.is(1, iter3.closed);
    },
);

