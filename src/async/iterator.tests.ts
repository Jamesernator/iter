import * as assert from "../lib/assert.js";
import iterator from "./iterator.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    async "iterator returns an iterator for a given iterable"() {
        const iter = iterator([1, 2]);

        assert.is("function", typeof iter.next);
        assert.deepEqual({ done: false, value: 1 }, await iter.next());
        assert.deepEqual({ done: false, value: 2 }, await iter.next());
        assert.deepEqual({ done: true, value: undefined }, await iter.next());
    },

    async "calling return is idempotent when the sequence is already closed"() {
        const data = new CountClosing([1, 2, 3, 4, 5]);
        const seq = iterator(data);

        await seq.next();
        await seq.next();
        assert.is(data.closed, 0);
        await seq.return();
        assert.is(data.closed, 1);
        await seq.return();
        assert.is(data.closed, 1);
    },
};
