import test from "ava";
import iterator from "./iterator.js";
import length from "./length.js";

test(
    "length returns the length of the iterable",
    (t) => {
        const data1 = [1, 2, 3, 4];
        const data2 = iterator([1, 2]);
        const data3: Array<number> = [];

        t.is(4, length(data1));
        t.is(2, length(data2));
        t.is(0, length(data2));
        t.is(0, length(data3));
    },
);
