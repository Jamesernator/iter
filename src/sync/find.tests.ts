import * as assert from "../lib/assert.js";
import find from "./find.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "find returns the first item matching a predicate"() {
        const val = { x: 10, y: 20 };
        const data = [1, { x: 20, y: "banana" }, 2, "banana", val, NaN, ""];

        assert.is(val,  find(data, (item) => typeof item === "object" && item.x === 10));
        assert.is(2,  find(data, (item) => item === 2));
    },

     "find throws when it can't find the given element"() {
        const data = [1, 2, 2, 4];

         assert.throws(() => find(data, (x) => x === 42));
         assert.throws(() => find([], (x) => x === 42));
    },

     "find returns the default value if it can't find the given element"() {
        const data = [1, 2, 3, 4];

        assert.is(9,  find(data, 9, (item) => item === 42));

        const empty: Array<number> = [];

        assert.is(9,  find(empty, 9, (item) => item === 42));
    },

     "find with no argument returns the first value that is truthy"() {
        const data = [0, null, undefined, "", false, "foo", 0, false];

        assert.is("foo",  find(data));
    },

     "find iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);

         find(iter, 99, (x) => x > 5);
        assert.is(iter.closed, 0);

        const iter2 = new CountClosing([1, 2, 3, 4]);

         find(iter2, 99, (x) => x === 2);
        assert.is(iter2.closed, 1);

        const iter3 = new CountClosing([1, 2, 3, 4]);
         assert.throws(() => find(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        assert.is(1, iter3.closed);
    },
};
