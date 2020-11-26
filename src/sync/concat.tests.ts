import test from "ava";
import concat from "./concat.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";
import toArray from "./toArray.js";

test(
    "concat emits items from both sequences in sequence",
    (t) => {
        const expected1 = [1, 2, 3, 4, 5, 6];

        t.deepEqual(expected1, toArray(concat([
            [1, 2, 3],
            [4, 5, 6],
        ])));

        const expected2 = [1, 2, 3, 4];

        t.deepEqual(expected2, toArray(concat([
            [1, 2, 3, 4],
            [],
        ])));
        t.deepEqual(expected2, toArray(concat([
            [],
            [1, 2, 3, 4],
        ])));

        t.deepEqual([], toArray(concat([
            [],
            [],
        ])));
    },
);

test(
    "concat works with multiple concatenations",
    (t) => {
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        t.deepEqual(expected, toArray(concat([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ])));
    },
);

test(
    "concat can reuse the same iterable multiple times",
    (t) => {
        const x = [1, 2];
        const expected = [1, 2, 1, 2, 1, 2, 1, 2];

        t.deepEqual(expected, toArray(concat([x, x, x, x])));
    },
);

test(
    "concat iterator closing",
    (t) => {
        const iter1 = new CountClosing([1, 2]);
        const iter2 = new CountClosing([1, 2, 3]);
        const iter3 = new CountClosing([1, 2]);

        const seq = iterator(concat([iter1, iter2, iter3]));

        for (let i = 0; i < 4; i += 1) {
            seq.next();
        }
        seq.return();

        t.is(iter1.closed, 0);
        t.is(iter2.closed, 1);
        t.is(iter3.closed, 0);
    },
);
