import test from "ava";
import concat from "../../async/concat.js";
import toArray from "../../async/toArray.js";
import CountClosing from "./helpers/CountClosing.js";

test("concat works with single concatentation", async (t) => {
    t.deepEqual(
        await toArray(concat([[1, 2, 3, 4], [5, 6, 7, 8]])),
        [1, 2, 3, 4, 5, 6, 7, 8],
    );

    t.deepEqual(
        await toArray(concat([[1, 2, 3, 4], []])),
        [1, 2, 3, 4],
    );

    t.deepEqual(
        await toArray(concat([[], [1, 2, 3, 4]])),
        [1, 2, 3, 4],
    );

    t.deepEqual(
        await toArray(concat([[], []])),
        [],
    );
});

test("concat works with multiple concatentations", async (t) => {
    t.deepEqual(
        await toArray(concat([[1, 2, 3], [4, 5, 6], [7, 8, 9]])),
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
    );
});

test("concat can reuse the same iterable multiple times", async (t) => {
    const x = [1, 2];
    t.deepEqual(
        await toArray(concat([x, x, x, x])),
        [1, 2, 1, 2, 1, 2, 1, 2],
    );
});

test("concat nothing results in the empty array", async (t) => {
    t.deepEqual([], await toArray(concat([])));
});


test("iterator closing", async (t) => {
    const d1 = new CountClosing([1, 2]);
    const d2 = new CountClosing([1, 2, 3]);
    const d3 = new CountClosing([1, 2]);

    const seq = concat([d1, d2, d3])[Symbol.asyncIterator]();
    for (let i = 0; i < 4; i += 1) {
        await seq.next();
    }
    await seq.return!();
    t.is(d1.closed, 0);
    t.is(d2.closed, 1);
    t.is(d3.closed, 0);
});
