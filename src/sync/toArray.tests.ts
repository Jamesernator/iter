import test from "ava";
import toArray from "./toArray.js";

test("array converts iterable to array", (t) => {
    const seq = function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    t.deepEqual(
        toArray(seq()),
        [1, 2, 3],
    );

    const seq2 = function* () {
        yield* [];
    };

    t.deepEqual(
        toArray(seq2()),
        [],
    );
});
