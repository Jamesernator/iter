import test from "ava";
import first from "./first.js";
import CountClosing from "./helpers/CountClosing.js";

test("first with no arguments returns the first element of the sequence", async (t) => {
    t.is(
        await first([1, 2, 3, 4]),
        1,
    );

    t.is(
        await first(["banana", 342]),
        "banana",
    );
});

test("first with no arguments throws an error on an empty sequence", async (t) => {
    await t.throwsAsync(() => first([]));
});


test("iterator closing", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);

    await first(data);
    t.is(data.closed, 1);
});
