import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

test(
    "iterator returns an iterator for a given iterable",
    (t) => {
        const iter = iterator([1, 2]);

        t.is("function", typeof iter.next);
        t.deepEqual({ done: false, value: 1 }, iter.next());
        t.deepEqual({ done: false, value: 2 }, iter.next());
        t.deepEqual({ done: true, value: undefined }, iter.next());
    },
);

test(
    "calling return is idempotent when the sequence is already closed",
    (t) => {
        const data = new CountClosing([1, 2, 3, 4, 5]);
        const seq = iterator(data);

        seq.next();
        seq.next();
        t.is(data.closed, 0);
        seq.return();
        t.is(data.closed, 1);
        seq.return();
        t.is(data.closed, 1);
    },
);
