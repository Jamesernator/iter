import * as assert from "../lib/assert.js";
import iterator from "./iterator.js";
import filter from "./filter.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "filter can filter data out of the sequence"() {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expected = [3, 6, 9];

        assert.deepEqual(expected,  toArray(filter(data, (i) => i % 3 === 0)));
    },

     "filter receives the index"() {
        const data = [4, 3, 2, 1];
        const expected = [4, 2];

        assert.deepEqual(expected,  toArray(filter(data, (_, i) => i % 2 === 0)));
    },

     "filter iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(filter(iter, (x) => x % 2 === 0));

         seq.next();
         seq.return();

        assert.is(iter.closed, 1);
    },

     "filter iterator closing on predicate error"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(filter(iter, (value) => {
            if (value === 3) {
                throw new Error("Test");
            }
            return true;
        }));

         assert.throws(() => toArray(seq));
        assert.is(iter.closed, 1);
    },
};
