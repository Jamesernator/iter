import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";
import toArray from "./toArray.js";
import zipLongest from "./zipLongest.js";

test(
    "zipLongest returns a sequence of zipped sets",
    (t) => {
        const data1 = [1, 2, 3, 4, 5];
        const data2 = [6, 7, 8, 9, 10];
        const expected: Array<[number | undefined, number | undefined]> = [
            [1, 6],
            [2, 7],
            [3, 8],
            [4, 9],
            [5, 10],
        ];

        t.deepEqual(expected, toArray(zipLongest([data1, data2])));
    },
);

test(
    "zipLongest with sequences of different length fills holes with undefined",
    (t) => {
        const data1 = [1, 2];
        const data2 = [1, 2, 3, 4];
        const expected = [
            [1, 1],
            [2, 2],
            [undefined, 3],
            [undefined, 4],
        ];

        t.deepEqual(expected, toArray(zipLongest([data1, data2])));
    },
);

test(
    "zipLongest can accept more than two iterables",
    (t) => {
        const data1 = [1, 2, 3];
        const data2 = [4, 5, 6];
        const data3 = [7, 8, 9, 10];

        const expected = [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [undefined, undefined, 10],
        ];

        t.deepEqual(expected, toArray(zipLongest([data1, data2, data3])));
    },
);

test(
    "zipLongest iterator closing all if early",
    (t) => {
        const iter1 = new CountClosing([1, 2]);
        const iter2 = new CountClosing([1, 2, 3, 4]);

        const seq = iterator(zipLongest([iter1, iter2]));

        t.deepEqual(seq.next(), { done: false, value: [1, 1] });
        t.deepEqual(seq.next(), { done: false, value: [2, 2] });
        t.deepEqual(seq.next(), { done: false, value: [undefined, 3] });
        seq.return();

        t.is(iter1.closed, 0);
        t.is(iter2.closed, 1);
    },
);
