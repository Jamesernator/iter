import test from "ava";
import first from "./first.js";
import CountClosing from "./helpers/CountClosing.js";

test("first with no arguments returns the first element of the sequence", (t) => {
    t.is(
        first([1, 2, 3, 4]),
        1,
    );

    t.is(
        first(["banana", 342]),
        "banana",
    );
});

test("first with no arguments throws an error on an empty sequence", (t) => {
    t.throws(() => first([]));
});


test("iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);

    first(data);
    t.is(data.closed, 1);
});
