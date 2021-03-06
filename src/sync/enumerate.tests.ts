import test from "ava";
import enumerate from "./enumerate.js";
import CountClosing from "./helpers/CountClosing.js";
import toArray from "./toArray.js";

test(
    "enumerate gives pairs of values",
    (t) => {
        const data = [9, 11, 2, 12];
        const expected: Array<[number, number]> = [[0, 9], [1, 11], [2, 2], [3, 12]];

        t.deepEqual(expected, toArray(enumerate(data)));
    },
);

test(
    "enumerate iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);

        iter.next();
        iter.return();

        t.is(iter.closed, 1);
    },
);
