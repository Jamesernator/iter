import CountClosing from "./helpers/CountClosing.js";
import iterator from "../../async/--iterator.js";
import test from "ava";

test("iterator returns an iterator for a given iterable", async (t) => {
    const iter = iterator([1, 2]);

    t.is("function", typeof iter.next);
    t.deepEqual(await iter.next(), { done: false, value: 1 });
    t.deepEqual(await iter.next(), { done: false, value: 2 });
    t.deepEqual(await iter.next(), { done: true, value: undefined as unknown as number });
});

test("iterator reuses the initial value of nextMethod", async (t) => {
    const iterable = {
        [Symbol.asyncIterator]() {
            return {
                _calls: 0,

                async next() {
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

    t.deepEqual(await iter.next(), { done: false, value: 1 });
    t.deepEqual(await iter.next(), { done: false, value: 1 });
});

test("calling return is idempotent when the sequence is already closed", async (t) => {
    const data = new CountClosing([1, 2, 3, 4, 5]);
    const seq = iterator(data);

    await seq.next();
    await seq.next();
    t.is(data.closed, 0);
    await seq.return!();
    t.is(data.closed, 1);
    await seq.return!();
    t.is(data.closed, 1);
});
