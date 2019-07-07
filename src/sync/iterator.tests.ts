import * as assert from "../lib/assert.js";
import iterator from "./iterator.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "iterator returns an iterator for a given iterable"() {
        const iter = iterator([1, 2]);

        assert.is("function", typeof iter.next);
        assert.deepEqual({ done: false, value: 1 },  iter.next());
        assert.deepEqual({ done: false, value: 2 },  iter.next());
        assert.deepEqual({ done: true, value: undefined },  iter.next());
    },

     "calling return is idempotent when the sequence is already closed"() {
        const data = new CountClosing([1, 2, 3, 4, 5]);
        const seq = iterator(data);

         seq.next();
         seq.next();
        assert.is(data.closed, 0);
         seq.return();
        assert.is(data.closed, 1);
         seq.return();
        assert.is(data.closed, 1);
    },
};
