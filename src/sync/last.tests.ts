import test from "ava";
import last from "./last.js";

test("last with no arguments returns the last element of the sequence", (t) => {
    t.is(
        last([1, 2, 3, 4]),
        4,
    );

    t.is(
        last(["banana", 342]),
        342,
    );
});

test("last with no arguments throws an error on an empty sequence", (t) => {
    t.throws(last([]));
});

