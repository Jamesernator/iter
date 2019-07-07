import * as assert from "../lib/assert.js";
import sampleOne from "./sampleOne.js";

export const tests = {
     "sampleOne returns an arbitrary element of the sequence"() {
        const data = [1, 2, 3, 4];
        const choice =  sampleOne(data);

        assert.is(typeof choice, "number");
        assert.isTrue(data.includes(choice));
    },

     "sampleOne throws given an empty sequence"() {
        const data: Array<number> = [];

         assert.throws(() => sampleOne(data));
    },
};
