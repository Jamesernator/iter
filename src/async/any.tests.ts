import * as assert from "../lib/assert.js";
import any from "./any.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    async "any without argument returns true if a value is truthy"() {
        const values1 = [true, "cats", {}, 1];
        const values2 = [false, 0, "", undefined, null];
        const values3 = [false, 0, {}, "", undefined, null];

        assert.isTrue(await any(values1));
        assert.isFalse(await any(values2));
        assert.isTrue(await any(values3));
    },

    async "any returns true if the predicate returns true for all of the values"() {
        const values = [1, 3, 5, 7];

        assert.isTrue(await any(values, (item) => item % 2 === 1));
        assert.isTrue(await any(values, (item) => item < 5));
        assert.isFalse(await any(values, (item) => item > 10));
    },

    async "any vacuously false"() {
        const values: Array<number> = [];

        assert.isFalse(await any(values));
        assert.isFalse(await any(values, (item) => item % 2 === 0));
    },

    async "any iterator closing"() {
        const iter1 = new CountClosing([1, 2, 3, 4]);

        assert.isTrue(await any(iter1, (value) => value > 0));
        assert.is(iter1.closed, 1);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        assert.isFalse(await any(iter1, (value) => value === 12));
        assert.is(iter2.closed, 0);
    },
};
