import test from "ava";
import findLastIndex from "./findLastIndex.js";
import CountClosing from "./helpers/CountClosing.js";

test("findLastIndex basic functionality", async (t) => {
    const data = [1, 2, 3, 4, 5, 1];

    t.is(
        await findLastIndex(data, (x) => x === 2),
        1,
    );

    t.is(
        await findLastIndex(data, (x) => x === 1),
        5,
    );
});

test("findLastIndex throws when no value is found matching predicate", async (t) => {
    const data = [1, 2, 3, 4];
    await t.throwsAsync(findLastIndex(data, (x) => x === 42));
});

test("findLastIndex defaults to index of last truthy value", async (t) => {
    const data = [1, 0, undefined, false, null, "", NaN, 1, false];
    t.is(
        await findLastIndex(data),
        7,
    );
});

test("findLastIndex with default returns default is not found", async (t) => {
    const data = [1, 2, 3, 4, 3, 12];

    t.is(
        await findLastIndex(data, -1, (x) => x === 42),
        -1,
    );

    t.is(
        await findLastIndex(data, -1, (x) => x === 42),
        -1,
    );

    t.is(
        await findLastIndex(data, -1, (x) => x === 3),
        4,
    );
});


test("iterator closing", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);

    await findLastIndex(data, 99, (x) => x > 5);
    t.is(data.closed, 0);

    await findLastIndex(data, 99, (x) => x === 2);
    t.is(data.closed, 0);
});
