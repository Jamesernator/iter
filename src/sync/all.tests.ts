import test from "ava";
import all from "./all.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "all without argument returns true if all values are truthy",
    (t) => {
        const values1 = [true, "cats", {}, 1];
        const values2 = [false, "cats", 0, "", undefined];

        t.true(all(values1));
        t.false(all(values2));
    },
);

test(
    "all returns true if predicate returns truthy for all items",
    (t) => {
        const values = [1, 3, 5, 7];

        t.true(all(values, (item) => item % 2 === 1));
        t.false(all(values, (item) => item < 5));
    },
);

test(
    "all vacuously true",
    (t) => {
        const items: Array<number> = [];

        t.true(all(items));
        t.true(all(items, (value) => value % 2 === 0));
    },
);

test(
    "all iterator closing",
    (t) => {
        const iter1 = new CountClosing([1, 2, 3, 4]);

        t.true(all(iter1, (value) => value > 0));
        t.is(iter1.closed, 0);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        t.false(all(iter2, (value) => value === 2));
        t.is(iter2.closed, 1);
    },
);
