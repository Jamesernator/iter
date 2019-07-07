import * as assert from "../lib/assert.js";
import forEach from "./forEach.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "forEach calls the callback with each item in the sequence"() {
        const data = ["foo", "bar", "baz", "boz"];
        const expected = [["foo", 0], ["bar", 1], ["baz", 2], ["boz", 3]];

        const result: Array<[string, number]> = [];

         forEach(data, (item, index) => result.push([item, index]));

        assert.deepEqual(expected, result);
    },

     "forEach iterator closing on callback error"() {
        const out: Array<number> = [];
        const iter = new CountClosing([1, 2, 3, 4]);

         assert.throws(() => forEach(iter, (value) => {
            if (value === 2) {
                throw new Error("Test");
            }
            out.push(value);
        }));
        assert.deepEqual([1], out);
        assert.is(1, iter.closed);
    },
};
