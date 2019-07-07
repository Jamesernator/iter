import * as assert from "../lib/assert.js";
import findLastIndex from "./findLastIndex.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "findLastIndex returns the last index of a given item"() {
        const val = { x: 10, y: 20 };
        const data = [1, { x: 10, y: "banana" }, 2, "banana", val, NaN, ""];

        assert.is(4,  findLastIndex(data, (item) => typeof item === "object" && item.x === 10));
        assert.is(2,  findLastIndex(data, (item) => item === 2));
    },

     "findLastIndex throws an error if no item is found"() {
        const data = [1, 2, 3, 4];

         assert.throws(() => findLastIndex(data, (x) => x === 42));
    },

     "findLastIndex with no argument returns the last index for which the value is truthy"() {
        const data = [0, false, undefined, "", null, "foo", 0, null, "banana", 0];

        assert.is(8,  findLastIndex(data));
    },

     "findLastIndex returns the default value if not found"() {
        const data = [1, 2, 3, 4];

        assert.is(-1,  findLastIndex(data, -1, (x) => x > 12));
        assert.is(null,  findLastIndex(data, null, (x) => x > 12));
    },

     "findLastIndex iterator closing"() {
        const iter1 = new CountClosing([1, 2, 3, 4]);

         findLastIndex(iter1, 99, (x) => x > 5);
        assert.is(0, iter1.closed);

        const iter2 = new CountClosing([1, 2, 3, 4]);

         findLastIndex(iter2, 99, (x) => x === 2);
        assert.is(0, iter2.closed);

        const iter3 = new CountClosing([1, 2, 3, 4]);
         assert.throws(() => findLastIndex(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        assert.is(1, iter3.closed);
    },
};
