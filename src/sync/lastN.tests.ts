import test from "ava";
import lastN from "./lastN.js";

test(
    "lastN returns a sequence of the correct length",
    (t) => {
        const data = [1, 2, 3, 4, 5, 6, 7];

        t.deepEqual([5, 6, 7], lastN(data, 3));
        t.deepEqual([7], lastN(data, 1));
        t.deepEqual([], lastN([], 0));
    },
);

test(
    "lastN with sequence too short throws an error",
    (t) => {
        t.throws(() => lastN([1, 2], 3));
        t.throws(() => lastN([], 1));
    },
);

test(
    "lastN with sequence too short can be return shorter sequence by passing true",
    (t) => {
        t.deepEqual([1, 2], lastN([1, 2], 3, true));
        t.deepEqual([], lastN([], 3, true));
    },
);

