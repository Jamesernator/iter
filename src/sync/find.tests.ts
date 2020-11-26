import test from "ava";
import find from "./find.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "find returns the first item matching a predicate",
    (t) => {
        const val = { x: 10, y: 20 };
        const data = [
            1,
            { x: 20, y: "banana" },
            2,
            "banana",
            val,
            NaN,
            "",
        ];

        t.is(val, find(data, (item) => {
            return typeof item === "object" && item.x === 10;
        }));
        t.is(2, find(data, (item) => item === 2));
    },
);

test(
    "find throws when it can't find the given element",
    (t) => {
        const data = [1, 2, 2, 4];

        t.throws(() => find(data, (x) => x === 42));
        t.throws(() => find([], (x) => x === 42));
    },
);

test(
    "find returns the default value if it can't find the given element",
    (t) => {
        const data = [1, 2, 3, 4];

        t.is(9, find(data, 9, (item) => item === 42));

        const empty: Array<number> = [];

        t.is(9, find(empty, 9, (item) => item === 42));
    },
);

test(
    "find with no argument returns the first value that is truthy",
    (t) => {
        const data = [0, null, undefined, "", false, "foo", 0, false];

        t.is("foo", find(data));
    },
);

test(
    "find iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);

        find(iter, 99, (x) => x > 5);
        t.is(iter.closed, 0);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        find(iter2, 99, (x) => x === 2);
        t.is(iter2.closed, 1);

        const iter3 = new CountClosing([1, 2, 3, 4]);
        t.throws(() => find(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        t.is(1, iter3.closed);
    },
);
