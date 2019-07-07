import * as assert from "../lib/assert.js";
import firstN from "./firstN.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "firstN returns an array of the first N elements"() {
        const data = [12, 9, 2, 3, 9];
        assert.deepEqual([12, 9, 2],  firstN(data, 3));
    },

     "firstN with count too short throws an error"() {
        const data = [1, 2, 3];

         assert.throws(() => firstN(data, 5));
    },

     "firstN with count too short can be supressed by passing true"() {
        const data = [1, 2, 3];

        assert.deepEqual([1, 2, 3],  firstN(data, 5, true));
    },

     "firstN iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);

         firstN(iter, 2);
        assert.is(1, iter.closed);

        const iter2 = new CountClosing([1, 2, 3, 4]);

         firstN(iter, 5, true);
        assert.is(iter2.closed, 0);
    },
};
