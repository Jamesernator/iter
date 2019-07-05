import test from "ava";
import findIndex from "./findIndex.js";
import CountClosing from "./helpers/CountClosing.js";

test("findIndex finds item if it exists", (t) => {
    const data = [1, 2, 3, 4];

    t.is(
        findIndex(data, (x) => x === 3),
        2,
    );
});

test("findIndex throws error if no item is found", (t) => {
    const data = [1, 2, 3, 4];

    t.throws(() => findIndex(data, (x) => x === 42));
});

test("findIndex with no argument returns the index of the first truthy", (t) => {
    const data = [0, undefined, null, "", NaN, false, 1];

    t.is(
        findIndex(data),
        6,
    );
});

test("findIndex returns default value if not found", (t) => {
    const data = [1, 2, 3, 4, 1, 2, 1, 2, 1];

    t.is(
        findIndex(data, -1, (x) => x === 42),
        -1,
    );

    t.is(
        findIndex(data, -1, (x) => x === 4),
        3,
    );
});

test("iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);

    findIndex(data, 99, (x) => x > 5);
    t.is(data.closed, 0);

    findIndex(data, 99, (x) => x === 2);
    t.is(data.closed, 1);
});
