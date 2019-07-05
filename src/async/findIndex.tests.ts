import test from "ava";
import findIndex from "./findIndex.js";
import CountClosing from "./helpers/CountClosing.js";

test("findIndex finds item if it exists", async (t) => {
    const data = [1, 2, 3, 4];

    t.is(
        await findIndex(data, (x) => x === 3),
        2,
    );
});

test("findIndex throws error if no item is found", async (t) => {
    const data = [1, 2, 3, 4];

    await t.throwsAsync(findIndex(data, (x) => x === 42));
});

test("findIndex with no argument returns the index of the first truthy", async (t) => {
    const data = [0, undefined, null, "", NaN, false, 1];

    t.is(
        await findIndex(data),
        6,
    );
});

test("findIndex returns default value if not found", async (t) => {
    const data = [1, 2, 3, 4, 1, 2, 1, 2, 1];

    t.is(
        await findIndex(data, -1, (x) => x === 42),
        -1,
    );

    t.is(
        await findIndex(data, -1, (x) => x === 4),
        3,
    );
});

test("iterator closing", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);

    await findIndex(data, 99, (x) => x > 5);
    t.is(data.closed, 0);

    await findIndex(data, 99, (x) => x === 2);
    t.is(data.closed, 1);
});
