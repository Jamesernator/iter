import test from "ava";
import lastN from "./lastN.js";

test("lastN with numeric argument returns a sequence of that length", async (t) => {
    t.deepEqual(
        await lastN([1, 2, 3, 4, 5, 6, 7], 3),
        [5, 6, 7],
    );

    t.deepEqual(
        await lastN([1, 2, 3, 4], 0),
        [],
    );
});

test("lastN with count that is too short throws an error", async (t) => {
    await t.throwsAsync(() => lastN([1, 2], 3));
    await t.throwsAsync(() => lastN([], 1));
    await t.notThrowsAsync(() => lastN([], 0));
});

test("lastN with count that is too short can be supressed by passing true", async (t) => {
    t.deepEqual(
        await lastN([1, 2], 3, true),
        [1, 2],
    );
    t.deepEqual(
        await lastN([], 3, true),
        [],
    );
});
