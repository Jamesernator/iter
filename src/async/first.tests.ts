import * as assert from "../lib/assert.js";
import first from "./first.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    async "first returns the first element of the sequence"() {
        assert.is(12, await first([12, 8, 9, 2]));
        assert.is("banana", await first(["banana", 12, "foo"]));
    },

    async "first with empty sequence throws an error on empty sequence"() {
        await assert.throwsAsync(() => first([]));
    },

    async "first iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);

        await first(iter);
        assert.is(iter.closed, 1);
    },
};
