import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";
import pairWise from "./pairWise.js";
import toArray from "./toArray.js";

test(
    "pairWise returns pairs of values from the sequence",
    (t) => {
        const data1 = [1, 2, 3, 4, 5];
        const expected1 = [[1, 2], [2, 3], [3, 4], [4, 5]];

        t.deepEqual(expected1, toArray(pairWise(data1)));

        const data2 = [1, 2];
        const expected2 = [[1, 2]];

        t.deepEqual(expected2, toArray(pairWise(data2)));
    },
);

test(
    "pairWise throws error on sequence of insufficient length",
    (t) => {
        const data1 = [1];

        t.throws(() => toArray(pairWise(data1)));

        const data2: Array<number> = [];

        t.throws(() => toArray(pairWise(data2)));
    },
);

test(
    "pairWise doesn't throw error on sequence of insufficient length if allowShorter is true",
    (t) => {
        const data1 = [1];

        t.deepEqual([], toArray(pairWise(data1, true)));

        const data2: Array<number> = [];

        t.deepEqual([], toArray(pairWise(data2, true)));
    },
);

test(
    "pairWise iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(pairWise(iter));

        seq.next();
        seq.next();
        seq.return();

        t.is(iter.closed, 1);
    },
);

