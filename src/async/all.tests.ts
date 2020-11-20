import test from "ava";
import all from "./all.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "all without argument returns true if all values are truthy",
    async (t) => {
        const values1 = [true, "cats", {}, 1];
        const values2 = [false, "cats", 0, "", undefined];

        t.true(await all(values1));
        t.false(await all(values2));
    },
);

test(
    "all returns true if predicate returns truthy for all items",
    async (t) => {
        const values = [1, 3, 5, 7];

        t.true(await all(values, (item) => item % 2 === 1));
        t.false(await all(values, (item) => item < 5));
    },
);

test(
    "all vacuously true",
    async (t) => {
        const items: Array<number> = [];

        t.true(await all(items));
        t.true(await all(items, (value) => value % 2 === 0));
    },
);

test(
    "all iterator closing",
    async (t) => {
        const iter1 = new CountClosing([1, 2, 3, 4]);

        t.true(await all(iter1, (value) => value > 0));
        t.is(iter1.closed, 0);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        t.false(await all(iter2, (value) => value === 2));
        t.is(iter2.closed, 1);
    },
);
