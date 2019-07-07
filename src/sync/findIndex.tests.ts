import * as assert from "../lib/assert.js";
import findIndex from "./findIndex.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    "findIndex returns the first index of a given item"() {
        const data = [1, 2, 3, 4];

        assert.is(2, findIndex(data, (i) => i === 3));
    },

    "findIndex throws an error if no item is found"() {
        const data = [1, 2, 3, 4];

        assert.throws(() => findIndex(data, (x) => x === 42));
    },

    "findIndex with no argument returns the first index for which the value is truthy"() {
        const data = [0, false, undefined, "", null, "foo", 0, null];

        assert.is(5, findIndex(data));
    },

    "findIndex returns the default value if not found"() {
        const data = [1, 2, 3, 4];

        assert.is(-1, findIndex(data, -1, (x) => x > 12));
        assert.is(null, findIndex(data, null, (x) => x > 12));
    },

    "findIndex iterator closing"() {
        const iter1 = new CountClosing([1, 2, 3, 4]);

        findIndex(iter1, 99, (x) => x > 5);
        assert.is(0, iter1.closed);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        findIndex(iter2, 99, (x) => x === 2);
        assert.is(1, iter2.closed);

        const iter3 = new CountClosing([1, 2, 3, 4]);
        assert.throws(() => findIndex(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        assert.is(1, iter3.closed);
    },
};
