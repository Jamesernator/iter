import test from "ava";
import findLast from "./findLast.js";
import CountClosing from "./helpers/CountClosing.js";

test("findLast basic functionality", (t) => {
    const val = { x: 20, y: 20 };
    const data: Array<any> = [1, { x: 20, y: "banana" }, 2, "banana", val, NaN, ""];

    t.is(
        findLast(data, (item) => item instanceof Object && item.x === 20),
        val,
    );

    t.is(
        findLast(data, (item) => item === 2),
        2,
    );
});

test("findLast with no argument returns first truthy value", (t) => {
    const data = [10, 0, "", null, undefined, NaN, false, 1];
    t.is(
        findLast(data),
        1,
    );
});

test("findLast throws when it can't find any such element", (t) => {
    const data = [1, 2, 3, 4];
    t.throws(() => findLast(data, (x) => x === 42));

    const empty: Array<number> = [];
    t.throws(() => findLast(empty, (x) => x === 42));
});

test("findLast returns the default when provided and it can't find any such element", (t) => {
    const data = [1, 2, 3, 4];
    t.is(
        findLast(data, 0, (x) => x === 42),
        0,
    );

    const empty: Array<number> = [];
    t.is(
        findLast(empty, 0, (x) => x === 42),
        0,
    );

    t.is(
        findLast(data, "banana", (x) => x === 42),
        "banana",
    );
});


test("iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);

    findLast(data, 99, (x) => x > 5);
    t.is(data.closed, 0);

    findLast(data, 99, (x) => x === 2);
    t.is(data.closed, 0);
});
