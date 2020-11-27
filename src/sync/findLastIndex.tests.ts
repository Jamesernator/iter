import test from "ava";
import findLastIndex from "./findLastIndex.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "findLastIndex returns the last index of a given item",
    (t) => {
        const val = { x: 10, y: 20 };
        const data =
            [1, { x: 10, y: "banana" }, 2, "banana", val, NaN, ""];
        t.is(4, findLastIndex(
            data,
            (item) => typeof item === "object" && item.x === 10,
        ));
        t.is(2, findLastIndex(data, (item) => item === 2));
    },
);

test(
    "findLastIndex throws an error if no item is found",
    (t) => {
        const data = [1, 2, 3, 4];

        t.throws(() => findLastIndex(data, (x) => x === 42));
    },
);

test(
    "findLastIndex with no argument returns the last index for which the value is truthy",
    (t) => {
        const data = [0, false, undefined, "", null, "foo", 0, null, "banana", 0];

        t.is(8, findLastIndex(data));
    },
);

test(
    "findLastIndex returns the default value if not found",
    (t) => {
        const data = [1, 2, 3, 4];

        t.is(-1, findLastIndex(data, -1, (x) => x > 12));
        t.is(null, findLastIndex(data, null, (x) => x > 12));
    },
);

test(
    "findLastIndex iterator closing",
    (t) => {
        const iter1 = new CountClosing([1, 2, 3, 4]);

        findLastIndex(iter1, 99, (x) => x > 5);
        t.is(0, iter1.closed);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        findLastIndex(iter2, 99, (x) => x === 2);
        t.is(0, iter2.closed);

        const iter3 = new CountClosing([1, 2, 3, 4]);
        t.throws(() => findLastIndex(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        t.is(1, iter3.closed);
    },
);

