import * as assert from "../lib/assert.js";
import findLast from "./findLast.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "findLast returns the first item matching a predicate"() {
        const val = { x: 10, y: 20 };
        const data = [1, { x: 10, y: "banana" }, 2, "banana", val, NaN, ""];

        assert.is(val,  findLast(data, (item) => typeof item === "object" && item.x === 10));
        assert.is(2,  findLast(data, (item) => item === 2));
    },

     "findLast throws when it can't findLast the given element"() {
        const data = [1, 2, 2, 4];

         assert.throws(() => findLast(data, (x) => x === 42));
         assert.throws(() => findLast([], (x) => x === 42));
    },

     "findLast returns the default value if it can't findLast the given element"() {
        const data = [1, 2, 3, 4];

        assert.is(9,  findLast(data, 9, (item) => item === 42));

        const empty: Array<number> = [];

        assert.is(9,  findLast(empty, 9, (item) => item === 42));
    },

     "findLast with no argument returns the last value that is truthy"() {
        const data = [0, null, undefined, "", false, "foo", 0, false, "banana", null];

        assert.is("banana",  findLast(data));
    },

     "findLast iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);

         findLast(iter, 99, (x) => x > 5);
        assert.is(iter.closed, 0);

        const iter2 = new CountClosing([1, 2, 3, 4]);

         findLast(iter2, 99, (x) => x === 2);
        assert.is(0, iter2.closed);

        const iter3 = new CountClosing([1, 2, 3, 4]);
         assert.throws(() => findLast(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        assert.is(1, iter3.closed);
    },
};
