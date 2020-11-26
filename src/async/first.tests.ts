import test from "ava";
import first from "./first.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";

test(
    "first returns the first element of the sequence",
    async (t) => {
        t.is(12, await first(asyncIterableOf([12, 8, 9, 2])));
        t.is("banana", await first(asyncIterableOf(["banana", 12, "foo"])));
    },
);

test(
    "first with empty sequence throws an error on empty sequence",
    async (t) => {
        await t.throwsAsync(() => first(asyncIterableOf([])));
    },
);

test(
    "first iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await first(iter);
        t.is(iter.closed, 1);
    },
);

