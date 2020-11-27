import test from "ava";
import findIndex from "./findIndex.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "findIndex returns the first index of a given item",
    (t) => {
        const data = [1, 2, 3, 4];

        t.is(2, findIndex(data, (i) => i === 3));
    },
);

test(
    "findIndex throws an error if no item is found",
    (t) => {
        const data = [1, 2, 3, 4];

        t.throws(() => findIndex(data, (x) => x === 42));
    },
);

test(
    "findIndex with no argument returns the first index for which the value is truthy",
    (t) => {
        const data = [0, false, undefined, "", null, "foo", 0, null];

        t.is(5, findIndex(data));
    },
);

test(
    "findIndex returns the default value if not found",
    (t) => {
        const data = [1, 2, 3, 4];

        t.is(-1, findIndex(data, -1, (x) => x > 12));
        t.is(null, findIndex(data, null, (x) => x > 12));
    },
);

test(
    "findIndex iterator closing",
    (t) => {
        const iter1 = new CountClosing([1, 2, 3, 4]);

        findIndex(iter1, 99, (x) => x > 5);
        t.is(0, iter1.closed);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        findIndex(iter2, 99, (x) => x === 2);
        t.is(1, iter2.closed);

        const iter3 = new CountClosing([1, 2, 3, 4]);
        t.throws(() => findIndex(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        t.is(1, iter3.closed);
    },
);
