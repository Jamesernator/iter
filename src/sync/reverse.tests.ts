import test from "ava";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import reverse from "./reverse.js";
import toArray from "./toArray.js";

test(
    "reverse returns the items in reverse order",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4]);

        t.deepEqual([4, 3, 2, 1], await toArray(reverse(data)));

        t.deepEqual([], await toArray(reverse(asyncIterableOf([]))));
    },
);
