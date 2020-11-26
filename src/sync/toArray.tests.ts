import test from "ava";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import toArray from "./toArray.js";

test(
    "toArray converts the given sequence to an array",
    async (t) => {
        const seq = async function* () {
            yield 1;
            yield 2;
            yield 3;
        };

        t.deepEqual([1, 2, 3], await toArray(seq()));

        t.deepEqual([], await toArray(asyncIterableOf([])));
    },
);
