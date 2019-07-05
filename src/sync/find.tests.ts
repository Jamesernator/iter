import test from "ava";
import find from "./find.js";
import CountClosing from "./helpers/CountClosing.js";

test("find basic functionality", (t) => {
    const val = { x: 10, y: 20 };
    const data = [1, { x: 20, y: "banana" }, 2, "banana", val, NaN, ""];

    t.is(
        find(data, (item) => item instanceof Object && item.x === 10),
        val,
    );

    t.is(
        find(data, (item) => item === 2),
        2,
    );
});

test("find with no argument returns first truthy value", (t) => {
    const data = [0, "", null, undefined, NaN, false, 1];
    t.is(
        find(data),
        1,
    );
});

test("find throws when it can't find the given element", (t) => {
    const data = [1, 2, 3, 4];
    t.throws(() => find(data, (x) => x === 42));
    t.throws(() => find([], (x) => x === 42));
});

test("find returns the default value when it can't find the given element", (t) => {
    const data = [1, 2, 3, 4];
    t.is(
        find(data, 0, (x) => x === 42),
        0,
    );

    const empty: Array<number> = [];
    t.is(
        find(empty, 0, (x) => x === 42),
        0,
    );
});

test("iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);

    find(data, 99, (x) => x > 5);
    t.is(data.closed, 0);

    find(data, 99, (x) => x === 2);
    t.is(data.closed, 1);
});
