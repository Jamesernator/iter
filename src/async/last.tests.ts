import test from "ava";
import last from "./last.js";

test("last with no arguments returns the last element of the sequence", async (t) => {
    t.is(
        await last([1, 2, 3, 4]),
        4,
    );

    t.is(
        await last(["banana", 342]),
        342,
    );
});

test("last with no arguments throws an error on an empty sequence", async (t) => {
    await t.throwsAsync(() => last([]));
});

