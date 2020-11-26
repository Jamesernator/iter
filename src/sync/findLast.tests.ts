import test from "ava";
import findLast from "./findLast.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "findLast returns the first item matching a predicate",
    (t) => {
        const val = { x: 10, y: 20 };
        const data =
            [1, { x: 10, y: "banana" }, 2, "banana", val, NaN, ""];
        t.is(val, findLast(data, (item) => {
            return typeof item === "object" && item.x === 10;
        }));
        t.is(2, findLast(data, (item) => item === 2));
    },
);

test(
    "findLast throws when it can't findLast the given element",
    (t) => {
        const data = [1, 2, 2, 4];

        t.throws(() => findLast(data, (x) => x === 42));
        t.throws(() => findLast([], (x) => x === 42));
    },
);

test(
    "findLast returns the default value if it can't findLast the given element",
    (t) => {
        const data = [1, 2, 3, 4];

        t.is(9, findLast(data, 9, (item) => item === 42));

        const empty: Array<number> = [];

        t.is(9, findLast(empty, 9, (item) => item === 42));
    },
);

test(
    "findLast with no argument returns the last value that is truthy",
    (t) => {
        const data = [
            0,
            null,
            undefined,
            "",
            false,
            "foo",
            0,
            false,
            "banana",
            null,
        ];

        t.is("banana", findLast(data));
    },
);

test(
    "findLast iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);

        findLast(iter, 99, (x) => x > 5);
        t.is(iter.closed, 0);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        findLast(iter2, 99, (x) => x === 2);
        t.is(0, iter2.closed);

        const iter3 = new CountClosing([1, 2, 3, 4]);
        t.throws(() => findLast(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        t.is(1, iter3.closed);
    },
);

