import * as assert from "../lib/assert.js";
import last from "./last.js";

export const tests = {
     "last returns the last item of the sequence"() {
        assert.is(4,  last([1, 2, 3, 4]));

        assert.is("banana",  last([2, "banana", 34, "banana"]));
    },

     "last throws error with empty sequence"() {
         assert.throws(() => last([]));
    },
};
