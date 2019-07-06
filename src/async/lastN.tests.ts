import * as assert from "../lib/assert.js";
import lastN from "./lastN.js";

export const tests = {
    async "lastN returns a sequence of the correct length"() {
        const data = [1, 2, 3, 4, 5, 6, 7];

        assert.deepEqual([5, 6, 7], await lastN(data, 3));
        assert.deepEqual([7], await lastN(data, 1));
        assert.deepEqual([], await lastN([], 0));
    },

    async "lastN with sequence too short throws an error"() {
        await assert.throwsAsync(() => lastN([1, 2], 3));
        await assert.throwsAsync(() => lastN([], 1));
    },

    async "lastN with sequence too short can be return shorter sequence by passing true"() {
        assert.deepEqual([1, 2], await lastN([1, 2], 3, true));
        assert.deepEqual([], await lastN([], 3, true));
    },
};

