import test from "ava";
import subSequences from "./subSequences.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./--iterator.js";

test("subSequences emits small subSequencess of elements", async (t) => {
    const seq = [1, 2, 3, 4, 5, 6];
    t.deepEqual(
        await toArray(subSequences(seq, 3)),
        [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]],
    );
});

test("subSequences emits nothing given an Infinite subsequence with allowShorter", async (t) => {
    const seq = [1, 2, 3, 4, 5];
    t.deepEqual(
        await toArray(subSequences(seq, Infinity, true)),
        [],
    );
});

test("subSequences throws error when sequence is too short", async (t) => {
    const seq1: Array<number> = [];
    const seq2: Array<number> = [1, 2];

    await t.throwsAsync(() => toArray(subSequences(seq1, 3)));
    await t.throwsAsync(() => toArray(subSequences(seq2, 3)));
});

test("subSequences is empty when sequeunce is too short and allowShorter is used", async (t) => {
    const seq1: Array<number> = [];
    const seq2: Array<number> = [1, 2];

    t.deepEqual([], await toArray(subSequences(seq1, 3, true)));
    t.deepEqual([], await toArray(subSequences(seq2, 3, true)));
});

test("subSequences iterator closing", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(subSequences(data, 3));

    await seq.next();
    await seq.return!();
    t.is(data.closed, 1);
});
