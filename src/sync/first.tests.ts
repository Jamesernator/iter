import * as assert from "../lib/assert.js";
import first from "./first.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "first returns the first element of the sequence"() {
        assert.is(12,  first([12, 8, 9, 2]));
        assert.is("banana",  first(["banana", 12, "foo"]));
    },

     "first with empty sequence throws an error on empty sequence"() {
         assert.throws(() => first([]));
    },

     "first iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);

         first(iter);
        assert.is(iter.closed, 1);
    },
};
