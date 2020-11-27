import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";
import subSequences from "./subSequences.js";
import toArray from "./toArray.js";

test(
    "subSequences emits all subSequences of length n",
    (t) => {
        const data = [1, 2, 3, 4, 5];

        const expected = [[1, 2, 3], [2, 3, 4], [3, 4, 5]];

        t.deepEqual(expected, toArray(subSequences(data, 3)));
    },
);

test(
    "subSequences throws error when sequence is too short",
    (t) => {
        const data1: Array<number> = [];
        const data2 = [1, 2];

        t.throws(() => toArray(subSequences(data1, 3)));
        t.throws(() => toArray(subSequences(data2, 3)));
    },
);

test(
    "subSequences emits nothing given a subSequence too large and allowShorter=true",
    (t) => {
        const data = [1, 2, 3];

        t.deepEqual([], toArray(subSequences(data, 1000, true)));
    },
);

test(
    "subSequences iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4, 5]);
        const seq = iterator(subSequences(iter, 3));

        seq.next();
        seq.next();
        seq.return();

        t.is(iter.closed, 1);
    },
);
