import * as assert from "../lib/assert.js";
import subSequences from "./subSequences.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

export const tests = {
     "subSequences emits all subSequences of length n"() {
        const data = [1, 2, 3, 4, 5];

        const expected = [[1, 2, 3], [2, 3, 4], [3, 4, 5]];

        assert.deepEqual(expected,  toArray(subSequences(data, 3)));
    },

     "subSequences throws error when sequence is too short"() {
        const data1: Array<number> = [];
        const data2: Array<number> = [1, 2];

         assert.throws(() => toArray(subSequences(data1, 3)));
         assert.throws(() => toArray(subSequences(data2, 3)));
    },

     "subSequences emits nothing given a subSequence too large and allowShorter=true"() {
        const data = [1, 2, 3];

        assert.deepEqual([],  toArray(subSequences(data, 1000, true)));
    },

     "subSequences iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4, 5]);
        const seq = iterator(subSequences(iter, 3));

         seq.next();
         seq.next();
         seq.return();

        assert.is(iter.closed, 1);
    },
};
