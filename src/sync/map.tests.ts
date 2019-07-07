import * as assert from "../lib/assert.js";
import iterator from "./iterator.js";
import toArray from "./toArray.js";
import map from "./map.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "map returns a mapped sequences"() {
        const data = [1, 2, 3];

        assert.deepEqual([1, 4, 9],  toArray(map(data, (i) => i**2)));
    },

     "the mapper function receives the index as second arg"() {
        const data = [11, 22, 33];
        const expected = [[11, 0], [22, 1], [33, 2]];

        assert.deepEqual(expected,  toArray(map(data, (item, idx) => [item, idx])));
    },

     "map iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(iter);

         seq.next();
         seq.return();

        assert.is(1, iter.closed);
    },

     "map iterator closing on mapper error"() {
        const iter = new CountClosing([1, 2, 3, 4]);

         assert.throws(() => toArray(
            map(iter, (value) => {
                if (value === 2) {
                    throw new Error("Test");
                }
                return value ** 2;
            }),
        ));

        assert.is(1, iter.closed);
    },
};
