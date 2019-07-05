import test from "ava";
import pairWise from "./pairWise.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

test("pairWise basic functionality", (t) => {
    const data = [1, 2, 3, 4, 5, 6, 7];

    t.deepEqual(
        toArray(pairWise(data)),
        [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    );

    const data2 = [1, 2];

    t.deepEqual( toArray(pairWise(data2)), [[1, 2]]);
});

test("pairWise throws error on arrays of insufficient length", (t) => {
    const data = [1];

    t.throws(() => toArray(pairWise(data)));

    const data2: Array<any> = [];

    t.throws(() => toArray(pairWise(data2)));
});

test("pairWise doesn't throw error on array of insufficient length if allowShorter is true", (t) => {
    const data = [1];

    t.deepEqual([], toArray(pairWise(data, true)));

    const data2: Array<any> = [];

    t.deepEqual([], toArray(pairWise(data2, true)));
});

test("pairWise iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const pairs = iterator(pairWise(data));

    pairs.next();
    pairs.return!();
    t.is(data.closed, 1);
});
