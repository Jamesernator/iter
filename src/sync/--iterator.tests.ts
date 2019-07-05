import test from "ava";
import iterator from "./--iterator.js";
import CountClosing from "./helpers/CountClosing.js";

test("iterator returns an iterator for a given iterable", (t) => {
    const iter = iterator([1, 2]);

    t.is("function", typeof iter.next);
    t.deepEqual( iter.next(), { done: false, value: 1 });
    t.deepEqual( iter.next(), { done: false, value: 2 });
    t.deepEqual( iter.next(), { done: true, value: undefined as unknown as number });
});

test("iterator reuses the initial value of nextMethod", (t) => {
    const iterable = {
        [Symbol.iterator]() {
            return {
                _calls: 0,

                next() {
                    if (this._calls === 0) {
                        this._calls += 1;
                        return { value: 1, done: false };
                    }
                    return { value: 2, done: false };
                },
            };
        },
    };

    const iter = iterator(iterable);

    t.deepEqual( iter.next(), { done: false, value: 1 });
    t.deepEqual( iter.next(), { done: false, value: 1 });
});

test("calling return is idempotent when the sequence is already closed", (t) => {
    const data = new CountClosing([1, 2, 3, 4, 5]);
    const seq = iterator(data);

    seq.next();
    seq.next();
    t.is(data.closed, 0);
    seq.return!();
    t.is(data.closed, 1);
    seq.return!();
    t.is(data.closed, 1);
});
