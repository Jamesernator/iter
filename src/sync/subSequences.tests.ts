import test from "ava";
import subSequences from "./subSequences.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./--iterator.js";

test("subSequences emits small subSequencess of elements", (t) => {
    const seq = [1, 2, 3, 4, 5, 6];
    t.deepEqual(
        toArray(subSequences(seq, 3)),
        [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]],
    );
});

test("subSequences emits nothing given an Infinite subsequence with allowShorter", (t) => {
    const seq = [1, 2, 3, 4, 5];
    t.deepEqual(
        toArray(subSequences(seq, Infinity, true)),
        [],
    );
});

test("subSequences throws error when sequence is too short", (t) => {
    const seq1: Array<number> = [];
    const seq2: Array<number> = [1, 2];

    t.throws(() => toArray(subSequences(seq1, 3)));
    t.throws(() => toArray(subSequences(seq2, 3)));
});

test("subSequences is empty when sequeunce is too short and allowShorter is used", (t) => {
    const seq1: Array<number> = [];
    const seq2: Array<number> = [1, 2];

    t.deepEqual([], toArray(subSequences(seq1, 3, true)));
    t.deepEqual([], toArray(subSequences(seq2, 3, true)));
});

test("subSequences iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(subSequences(data, 3));

    seq.next();
    seq.return!();
    t.is(data.closed, 1);
});
