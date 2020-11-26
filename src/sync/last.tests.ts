import test from "ava";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import last from "./last.js";

test(
    "last returns the last item of the sequence",
    async (t) => {
        t.is(4, await last(asyncIterableOf([1, 2, 3, 4])));

        t.is("banana", await last(asyncIterableOf(
            [2, "banana", 34, "banana"],
        )));
    },
);

test(
    "last throws error with empty sequence",
    async (t) => {
        await t.throwsAsync(() => last(asyncIterableOf([])));
    },
);

