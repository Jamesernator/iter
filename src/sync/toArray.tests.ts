import test from "ava";
import toArray from "./toArray.js";

test(
    "toArray converts the given sequence to an array",
    (t) => {
        const seq = function* () {
            yield 1;
            yield 2;
            yield 3;
        };

        t.deepEqual([1, 2, 3], toArray(seq()));

        t.deepEqual([], toArray([]));
    },
);
