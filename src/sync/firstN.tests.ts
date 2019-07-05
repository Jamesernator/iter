import test from "ava";
import firstN from "./firstN.js";
import CountClosing from "./helpers/CountClosing.js";

test("firstN with numeric argument returns a sequence of that length", (t) => {
    t.deepEqual(
        firstN([1, 2, 3, 4, 5, 6, 7], 3),
        [1, 2, 3],
    );

    t.deepEqual(
        firstN([1, 2, 3, 4], 0),
        [],
    );
});

test("firstN with count that is too short throws an error", (t) => {
    t.throws(() => firstN([1, 2], 3));
    t.throws(() => firstN([], 1));
    t.notThrows(() => firstN([], 0));
});

test("firstN with count that is too short can be supressed by passing true", (t) => {
    t.deepEqual(
        firstN([1, 2], 3, true),
        [1, 2],
    );
});

test("iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);

    firstN(data, 3);
    t.is(data.closed, 2);

    firstN(data, 5, true);
    t.is(data.closed, 2);
});
