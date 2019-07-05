import test from "ava";
import flatMap from "./flatMap.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

test("flatMap basic functionality", (t) => {
    const data = [1, 2, 3, 4];

    t.deepEqual(
        toArray(flatMap(data, (x) => [x, x])),
        [1, 1, 2, 2, 3, 3, 4, 4],
    );
    t.deepEqual(
        toArray(flatMap(data, (x) => [[x, x]])),
        [[1, 1], [2, 2], [3, 3], [4, 4]],
    );
});

function* throwsError() {
    yield 1;
    throw new Error("Test!");
}

test("iterator closing", (t) => {
    const data = new CountClosing([[1, 2], [2, 3, 4], throwsError(), [3, 2]]);
    const seq = iterator(flatMap(data, (i) => i));

    seq.next();
    seq.next();
    seq.return!();
    t.is(data.closed, 1);
});
