import test from "ava";
import toArray from "./toArray.js";
import observe from "./observe.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

function* seq() {
    yield 1;
    yield 2;
    yield 3;
}

test("debug invokes the function for each value in the sequence", (t) => {
    const result = [];
    // Exhaust a copy of the iterator
    for (const item of seq()) {
        result.push(item);
    }
    t.deepEqual(result, [1, 2, 3]);
});

test("debug mirrors the original sequence", (t) => {
    const newSeq = observe(seq(), (_) => {
        /* Do Nothing */
    });
    t.deepEqual( toArray(newSeq), [1, 2, 3]);
});

test("iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(observe(data, () => null));
    seq.next();
    seq.return!();

    t.is(data.closed, 1);
});
