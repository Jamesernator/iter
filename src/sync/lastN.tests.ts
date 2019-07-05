import test from "ava";
import lastN from "./lastN.js";

test("lastN with numeric argument returns a sequence of that length", (t) => {
    t.deepEqual(
        lastN([1, 2, 3, 4, 5, 6, 7], 3),
        [5, 6, 7],
    );

    t.deepEqual(
        lastN([1, 2, 3, 4], 0),
        [],
    );
});

test("lastN with count that is too short throws an error", (t) => {
    t.throws(() => lastN([1, 2], 3));
    t.throws(() => lastN([], 1));
    t.notThrows(() => lastN([], 0));
});

test("lastN with count that is too short can be supressed by passing true", (t) => {
    t.deepEqual(
        lastN([1, 2], 3, true),
        [1, 2],
    );
    t.deepEqual(
        lastN([], 3, true),
        [],
    );
});
