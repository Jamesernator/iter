import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

test(
    "iterator returns an iterator for a given iterable",
    async (t) => {
        const iter = iterator([1, 2]);

        t.is("function", typeof iter.next);
        t.deepEqual({ done: false, value: 1 }, await iter.next());
        t.deepEqual({ done: false, value: 2 }, await iter.next());
        t.deepEqual({ done: true, value: undefined }, await iter.next());
    },
);

test(
    "calling return is idempotent when the sequence is already closed",
    async (t) => {
        const data = new CountClosing([1, 2, 3, 4, 5]);
        const seq = iterator(data);

        await seq.next();
        await seq.next();
        t.is(data.closed, 0);
        await seq.return();
        t.is(data.closed, 1);
        await seq.return();
        t.is(data.closed, 1);
    },
);
