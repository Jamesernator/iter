import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import none from "./none.js";

test(
    "none returns true if no item matches the predicate",
    (t) => {
        const isEven = (i: number) => i % 2 === 0;

        const data1 = [1, 3, 5, 7, 9];
        const data2 = [1, 2, 3, 4, 5];
        const data3 = [2, 4, 6, 8];

        t.true(none(data1, isEven));
        t.false(none(data2, isEven));
        t.false(none(data3, isEven));
    },
);

test(
    "none is vacuously true",
    (t) => {
        const isEven = (i: number) => i % 2 === 0;

        t.true(none([], isEven));
    },
);

test(
    "none defaults to identity for truthiness",
    (t) => {
        const data1 = [0, false, "", null, undefined];
        const data2 = [0, false, "bar", "", null, undefined];
        const data3 = ["foo", {}, 12];

        t.true(none(data1));
        t.false(none(data2));
        t.false(none(data3));
    },
);

test(
    "none iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);

        none(iter, (i) => i === 2);
        t.is(iter.closed, 1);
    },
);

test(
    "none iterator closing on predicate error",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);

        t.throws(() => {
            return none(iter, (i) => {
                if (i === 2) {
                    throw new Error("Test");
                }
                return false;
            });
        });
        t.is(iter.closed, 1);
    },
);

