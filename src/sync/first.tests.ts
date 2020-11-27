import test from "ava";
import first from "./first.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "first returns the first element of the sequence",
    (t) => {
        t.is(12, first([12, 8, 9, 2]));
        t.is("banana", first(["banana", 12, "foo"]));
    },
);

test(
    "first with empty sequence throws an error on empty sequence",
    (t) => {
        t.throws(() => first([]));
    },
);

test(
    "first iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);

        first(iter);
        t.is(iter.closed, 1);
    },
);

