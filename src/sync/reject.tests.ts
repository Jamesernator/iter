import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";
import reject from "./reject.js";
import toArray from "./toArray.js";

test(
    "reject filters items for which the predice returns true",
    (t) => {
        const data1 = [1, 2, 3, 4, 5, 6];

        t.deepEqual([1, 3, 5], toArray(reject(data1, (i) => i % 2 === 0)));

        const data2 = [1, 2, 3, 4];

        t.deepEqual([3, 4], toArray(reject(data2, (i, idx) => idx < 2)));
    },
);

test(
    "reject iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(reject(iter, (i) => i % 2 === 0));

        seq.next();
        seq.next();
        seq.return();

        t.is(iter.closed, 1);
    },
);

test(
    "reject iterator closing on predicate error",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);

        t.throws(() => toArray(reject(iter, (i) => {
            if (i === 3) {
                throw new Error("Test");
            }
            return false;
        })));

        t.is(iter.closed, 1);
    },
);

