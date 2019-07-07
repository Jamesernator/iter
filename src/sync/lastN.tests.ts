import * as assert from "../lib/assert.js";
import lastN from "./lastN.js";

export const tests = {
     "lastN returns a sequence of the correct length"() {
        const data = [1, 2, 3, 4, 5, 6, 7];

        assert.deepEqual([5, 6, 7],  lastN(data, 3));
        assert.deepEqual([7],  lastN(data, 1));
        assert.deepEqual([],  lastN([], 0));
    },

     "lastN with sequence too short throws an error"() {
         assert.throws(() => lastN([1, 2], 3));
         assert.throws(() => lastN([], 1));
    },

     "lastN with sequence too short can be return shorter sequence by passing true"() {
        assert.deepEqual([1, 2],  lastN([1, 2], 3, true));
        assert.deepEqual([],  lastN([], 3, true));
    },
};

