import test from "ava";
import filter from "./filter.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";
import toArray from "./toArray.js";

test(
    "filter can filter data out of the sequence",
    (t) => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expected = [3, 6, 9];

        t.deepEqual(expected, toArray(filter(data, (i) => i % 3 === 0)));
    },
);

test(
    "filter receives the index",
    (t) => {
        const data = [4, 3, 2, 1];
        const expected = [4, 2];

        t.deepEqual(
            expected,
            toArray(filter(data, (_, i) => i % 2 === 0)),
        );
    },
);

test(
    "filter iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(filter(iter, (x) => x % 2 === 0));

        seq.next();
        seq.return();

        t.is(iter.closed, 1);
    },
);

test(
    "filter iterator closing on predicate error",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(filter(iter, (value) => {
            if (value === 3) {
                throw new Error("Test");
            }
            return true;
        }));

        t.throws(() => toArray(seq));
        t.is(iter.closed, 1);
    },
);

