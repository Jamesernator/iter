import test from "ava";
import findLastIndex from "./findLastIndex.js";
import CountClosing from "./helpers/CountClosing.js";

test("findLastIndex basic functionality", (t) => {
    const data = [1, 2, 3, 4, 5, 1];

    t.is(
        findLastIndex(data, (x) => x === 2),
        1,
    );

    t.is(
        findLastIndex(data, (x) => x === 1),
        5,
    );
});

test("findLastIndex throws when no value is found matching predicate", (t) => {
    const data = [1, 2, 3, 4];
    t.throws(() => findLastIndex(data, (x) => x === 42));
});

test("findLastIndex defaults to index of last truthy value", (t) => {
    const data = [1, 0, undefined, false, null, "", NaN, 1, false];
    t.is(
        findLastIndex(data),
        7,
    );
});

test("findLastIndex with default returns default is not found", (t) => {
    const data = [1, 2, 3, 4, 3, 12];

    t.is(
        findLastIndex(data, -1, (x) => x === 42),
        -1,
    );

    t.is(
        findLastIndex(data, -1, (x) => x === 42),
        -1,
    );

    t.is(
        findLastIndex(data, -1, (x) => x === 3),
        4,
    );
});


test("iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);

    findLastIndex(data, 99, (x) => x > 5);
    t.is(data.closed, 0);

    findLastIndex(data, 99, (x) => x === 2);
    t.is(data.closed, 0);
});
