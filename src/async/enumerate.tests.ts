import test from "ava";
import enumerate from "./enumerate.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";

test("enumerate gives pairs of values", async (t) => {
    t.deepEqual(
        await toArray(enumerate([5, 2, 1, "banana"])),
        [[0, 5], [1, 2], [2, 1], [3, "banana"]],
    );
});

test("iterator closing", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = enumerate(data)[Symbol.asyncIterator]();

    await seq.next();
    await seq.return!();
    t.is(data.closed, 1);
});
