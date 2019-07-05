import test from "ava";
import iterator from "./iterator.js";
import enumerate from "./enumerate.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";

test("enumerate gives pairs of values", (t) => {
    t.deepEqual(
        toArray(enumerate([5, 2, 1, "banana"])),
        [[0, 5], [1, 2], [2, 1], [3, "banana"]],
    );
});

test("iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(enumerate(data));

    seq.next();
    seq.return!();
    t.is(data.closed, 1);
});
