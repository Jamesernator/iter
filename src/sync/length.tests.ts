import test from "ava";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import length from "./length.js";

test(
    "length returns the length of the iterable",
    async (t) => {
        const data1 = asyncIterableOf([1, 2, 3, 4]);
        const data2 = iterator([1, 2]);
        const data3 = asyncIterableOf<number>([]);

        t.is(4, await length(data1));
        t.is(2, await length(data2));
        t.is(0, await length(data2));
        t.is(0, await length(data3));
    },
);
