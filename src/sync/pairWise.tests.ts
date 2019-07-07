import * as assert from "../lib/assert.js";
import pairWise from "./pairWise.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

export const tests = {
     "pairWise returns pairs of values from the sequence"() {
        const data1 = [1, 2, 3, 4, 5];
        const expected1 = [[1, 2], [2, 3], [3, 4], [4, 5]];

        assert.deepEqual(expected1,  toArray(pairWise(data1)));

        const data2 = [1, 2];
        const expected2 = [[1, 2]];

        assert.deepEqual(expected2,  toArray(pairWise(data2)));
    },

     "pairWise throws error on sequence of insufficient length"() {
        const data1 = [1];

         assert.throws(() => toArray(pairWise(data1)));

        const data2: Array<number> = [];

         assert.throws(() => toArray(pairWise(data2)));
    },

     "pairWise doesn't throw error on sequence of insufficient length if allowShorter is true"() {
        const data1 = [1];

        assert.deepEqual([],  toArray(pairWise(data1, true)));

        const data2: Array<number> = [];

        assert.deepEqual([],  toArray(pairWise(data2, true)));
    },

     "pairWise iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(pairWise(iter));

         seq.next();
         seq.next();
         seq.return();

        assert.is(iter.closed, 1);
    },
};
