import test from "ava";
import all from "./all.js";
import CountClosing from "./helpers/CountClosing.js";

test("all without argument returns true if all values are truthy", (t) => {
    const target1 = [true, "cats", {}, 1];
    const target2 = [false, "cats", 0, "", undefined];

    t.true(all(target1));

    t.false(all(target2));
});

test("all basic behaviour", (t) => {
    const target = [1, 3, 5, 7];

    t.true(all(target, (item) => item % 2 === 1));

    t.false(all(target, (item) => item < 5));
});

test("all vacuously true", (t) => {
    const target: Array<any> = [];

    t.true(all(target));

    t.true(all(target, (x) => x === 2e21));
});



test("iterator closing", (t) => {
    const iter = new CountClosing([1, 2, 3, 4]);

    t.true( all(iter, (x) => x > 0));
    t.is(iter.closed, 0);

    t.false( all(iter, (x) => x === 2));
    t.is(iter.closed, 1);
});
