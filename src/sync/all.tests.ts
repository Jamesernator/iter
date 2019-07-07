import * as assert from "../lib/assert.js";
import all from "./all.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "all without argument returns true if all values are truthy"() {
        const values1 = [true, "cats", {}, 1];
        const values2 = [false, "cats", 0, "", undefined];

        assert.isTrue( all(values1));
        assert.isFalse( all(values2));
    },

     "all returns true if predicate returns truthy for all items"() {
        const values = [1, 3, 5, 7];

        assert.isTrue( all(values, (item) => item % 2 === 1));
        assert.isFalse( all(values, (item) => item < 5));
    },

     "all vacuously true"() {
        const items: Array<number> = [];

        assert.isTrue( all(items));
        assert.isTrue( all(items, (value) => value % 2 === 0));
    },

     "all iterator closing"() {
        const iter1 = new CountClosing([1, 2, 3, 4]);

        assert.isTrue( all(iter1, (value) => value > 0));
        assert.is(iter1.closed, 0);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        assert.isFalse( all(iter2, (value) => value === 2));
        assert.is(iter2.closed, 1);
    },
};
