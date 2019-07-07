import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";

export const tests = {
     "toArray converts the given sequence to an array"() {
        const seq =  function* () {
            yield 1;
            yield 2;
            yield 3;
        };

        assert.deepEqual([1, 2, 3],  toArray(seq()));

        assert.deepEqual([],  toArray([]));
    },
};
