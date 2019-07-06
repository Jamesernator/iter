import * as assert from "../lib/assert.js";
import sampleN from "./sampleN.js";

export const tests = {
    async "sampleN returns an arbitrary array of items from the sequence of size n"() {
        const data = [1, 2, 3, 4, 5];

        const choice = await sampleN(data, 3);

        assert.isTrue(Array.isArray(choice));
        assert.is(choice.length, 3);

        for (const element of choice) {
            assert.isTrue(data.includes(element));
        }

        assert.is(choice.length, new Set(choice).size);
    },

    async "sampleN on a sequence too short throws an error"() {
        const data = [1, 2, 3];

        await assert.throwsAsync(() => sampleN(data, 5));
    },

    async "sampleN on a sequence too short returns the whole sequence if allowShorter is true"() {
        const data = [1, 2, 3];

        assert.deepEqual([1, 2, 3], await sampleN(data, 11, true));
    },
};
