import test from "ava";
import firstN from "./firstN.js";
import CountClosing from "./helpers/CountClosing.js";

test("firstN with numeric argument returns a sequence of that length", async (t) => {
    t.deepEqual(
        await firstN([1, 2, 3, 4, 5, 6, 7], 3),
        [1, 2, 3],
    );

    t.deepEqual(
        await firstN([1, 2, 3, 4], 0),
        [],
    );
});

test("firstN with count that is too short throws an error", async (t) => {
    await t.throwsAsync(() => firstN([1, 2], 3));
    await t.throwsAsync(() => firstN([], 1));
    await t.notThrowsAsync(() => firstN([], 0));
});

test("firstN with count that is too short can be supressed by passing true", async (t) => {
    t.deepEqual(
        await firstN([1, 2], 3, true),
        [1, 2],
    );
});

test("iterator closing", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);

    await firstN(data, 3);
    t.is(data.closed, 2);

    await firstN(data, 5, true);
    t.is(data.closed, 2);
});
