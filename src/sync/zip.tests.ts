import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";
import toArray from "./toArray.js";
import zip from "./zip.js";

test(
    "zip combines sequences together into a zipped sequence",
    (t) => {
        const data1 = [1, 2, 3, 4, 5];
        const data2 = [6, 7, 8, 9, 10];
        const expected = [
            [1, 6],
            [2, 7],
            [3, 8],
            [4, 9],
            [5, 10],
        ];

        t.deepEqual(expected, toArray(zip([data1, data2])));
    },

);

test(
    "zip only takes items until the shortest sequence is complete",
    (t) => {
        const data1 = [1, 2];
        const data2 = [1, 2, 3, 4];

        const expected = [[1, 1], [2, 2]];
        t.deepEqual(expected, toArray(zip([data1, data2])));
    },
);

test(
    "zip can accept multiple iterables",
    (t) => {
        const data1 = [1, 2, 3];
        const data2 = [4, 5, 6];
        const data3 = [7, 8, 9];

        const expected = [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ];

        t.deepEqual(expected, toArray(zip([data1, data2, data3])));
    },
);

test(
    "zip iterator closing on all sequences if closed early",
    (t) => {
        const iter1 = new CountClosing([1, 2, 3, 4]);
        const iter2 = new CountClosing([1, 2, 3, 4]);

        const seq = iterator(zip([iter1, iter2]));

        seq.next();
        seq.next();
        seq.return();

        t.is(iter1.closed, 1);
        t.is(iter2.closed, 1);
    },
);

test(
    "zip iterator closing open iterators on sequence consumed",
    (t) => {
        const iter1 = new CountClosing([1, 2]);
        const iter2 = new CountClosing([1, 2]);
        const iter3 = new CountClosing([1, 2, 3, 4]);

        toArray(zip([iter1, iter2, iter3]));

        t.is(iter1.closed, 0);
        t.is(iter2.closed, 0);
        t.is(iter3.closed, 1);
    },
);

