import test from "ava";
import toArray from "./toArray.js";
import zip from "./zip.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

test("zip basic functionality", (t) => {
    const d1 = [1, 2, 3, 4, 5];
    const d2 = [6, 7, 8, 9, 10];

    t.deepEqual( toArray(zip([d1, d2])), [
        [1, 6],
        [2, 7],
        [3, 8],
        [4, 9],
        [5, 10],
    ]);
});

test("zip only takes until shortest sequence is complete", (t) => {
    const d1 = [1, 2];
    const d2 = [1, 2, 3, 4];
    t.deepEqual( toArray(zip([d1, d2])), [
        [1, 1],
        [2, 2],
    ]);
});

test("zip can accept more than two iterables", (t) => {
    const d1 = [1, 2, 3];
    const d2 = [4, 5, 6];
    const d3 = [7, 8, 9];

    t.deepEqual( toArray(zip([d1, d2, d3])), [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
    ]);
});

test("zip iterator closing all sequences", (t) => {
    const data1 = new CountClosing([1, 2]);
    const data2 = new CountClosing([3, 4]);

    const seq = iterator(zip([data1, data2]));
    seq.next();
    seq.return!();
    t.is(data1.closed, 1);
    t.is(data2.closed, 1);
});

test("zip iterator closing only as needed on completion", (t) => {
    const data1 = new CountClosing([1, 2]);
    const data2 = new CountClosing([1, 2, 3]);

    const seq = iterator(zip([data1, data2]));
    seq.next();
    seq.next();
    seq.next();
    seq.return!();
    t.is(data1.closed, 0);
    t.is(data2.closed, 1);
});
