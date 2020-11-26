import test from "ava";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import toSet from "./toSet.js";

test(
    "toSet returns a set from the given sequence",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4, 3, 3, 2]);

        const set = await toSet(data);

        t.true(set instanceof Set);
        t.is(set.size, 4);

        t.true(set.has(1));
        t.true(set.has(2));
        t.true(set.has(3));
        t.true(set.has(4));
    },
);
