import test from "ava";
import toArray from "./toArray.js";

test("array converts iterable to array", async (t) => {
    const seq = async function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    t.deepEqual(
        await toArray(seq()),
        [1, 2, 3],
    );

    const seq2 = async function* () {
        yield* [];
    };

    t.deepEqual(
        await toArray(seq2()),
        [],
    );
});
