import test from "ava";
import firstN from "./firstN.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "firstN returns an array of the first N elements",
    (t) => {
        const data = [12, 9, 2, 3, 9];
        t.deepEqual([12, 9, 2], firstN(data, 3));
    },
);

test(
    "firstN with count too short throws an error",
    (t) => {
        const data = [1, 2, 3];

        t.throws(() => firstN(data, 5));
    },
);

test(
    "firstN with count too short can be supressed by passing true",
    (t) => {
        const data = [1, 2, 3];

        t.deepEqual([1, 2, 3], firstN(data, 5, true));
    },
);

test(
    "firstN iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);

        firstN(iter, 2);
        t.is(1, iter.closed);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        firstN(iter, 5, true);
        t.is(iter2.closed, 0);
    },
);

