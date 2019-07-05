import test from "ava";
import flat from "./flat.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./--iterator.js";

test("flat basic functionality", async (t) => {
    const data = [[1], [2, 3], [4, 5], [6], [7], [8, 9, 10]];

    t.deepEqual(
        await toArray(flat(data)),
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    );
});

function* throwsError() {
    yield 1;
    throw new Error("Test!");
}

test("iterator closing", async (t) => {
    const data = new CountClosing([[1, 2], [2, 3, 4], throwsError(), [3, 2]]);
    const seq = iterator(flat(data));

    await seq.next();
    await seq.next();
    await seq.return!();
    t.is(data.closed, 1);
});
