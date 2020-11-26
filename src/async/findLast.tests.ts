import test from "ava";
import findLast from "./findLast.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";

test(
    "findLast returns the first item matching a predicate",
    async (t) => {
        const val = { x: 10, y: 20 };
        const data = asyncIterableOf(
            [1, { x: 10, y: "banana" }, 2, "banana", val, NaN, ""],
        );

        t.is(val, await findLast(data, (item) => typeof item === "object" && item.x === 10));
        t.is(2, await findLast(data, (item) => item === 2));
    },
);

test(
    "findLast throws when it can't findLast the given element",
    async (t) => {
        const data = asyncIterableOf([1, 2, 2, 4]);

        await t.throwsAsync(() => findLast(data, (x) => x === 42));
        await t.throwsAsync(() => findLast([], (x) => x === 42));
    },
);

test(
    "findLast returns the default value if it can't findLast the given element",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4]);

        t.is(9, await findLast(data, 9, (item) => item === 42));

        const empty = asyncIterableOf<number>([]);

        t.is(9, await findLast(empty, 9, (item) => item === 42));
    },
);

test(
    "findLast with no argument returns the last value that is truthy",
    async (t) => {
        const data = asyncIterableOf([
            0,
            null,
            undefined,
            "",
            false,
            "foo",
            0,
            false,
            "banana",
            null,
        ]);

        t.is("banana", await findLast(data));
    },
);

test(

    "findLast iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await findLast(iter, 99, (x) => x > 5);
        t.is(iter.closed, 0);

        const iter2 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await findLast(iter2, 99, (x) => x === 2);
        t.is(0, iter2.closed);

        const iter3 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));
        await t.throwsAsync(() => findLast(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        t.is(1, iter3.closed);
    },
);

