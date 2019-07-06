import * as assert from "../lib/assert.js";
import last from "./last.js";

export const tests = {
    async "last returns the last item of the sequence"() {
        assert.is(4, await last([1, 2, 3, 4]));

        assert.is("banana", await last([2, "banana", 34, "banana"]));
    },

    async "last throws error with empty sequence"() {
        await assert.throwsAsync(() => last([]));
    },
};
