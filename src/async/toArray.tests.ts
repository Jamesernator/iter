import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";

export const tests = {
    async "toArray converts the given sequence to an array"() {
        const seq = async function* () {
            yield 1;
            yield 2;
            yield 3;
        };

        assert.deepEqual([1, 2, 3], await toArray(seq()));

        assert.deepEqual([], await toArray([]));
    },
};
