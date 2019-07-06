import * as assert from "../lib/assert.js";
import sampleOne from "./sampleOne.js";

export const tests = {
    async "sampleOne returns an arbitrary element of the sequence"() {
        const data = [1, 2, 3, 4];
        const choice = await sampleOne(data);

        assert.is(typeof choice, "number");
        assert.isTrue(data.includes(choice));
    },

    async "sampleOne throws given an empty sequence"() {
        const data: Array<number> = [];

        await assert.throwsAsync(() => sampleOne(data));
    },
};
