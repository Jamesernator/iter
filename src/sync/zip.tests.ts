import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";
import zip from "./zip.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

export const tests = {
     "zip combines sequences together into a zipped sequence"() {
        const data1 = [1, 2, 3, 4, 5];
        const data2 = [6, 7, 8, 9, 10];
        const expected = [
            [1, 6],
            [2, 7],
            [3, 8],
            [4, 9],
            [5, 10],
        ];

        assert.deepEqual(expected,  toArray(zip([data1, data2])));
    },

     "zip only takes items until the shortest sequence is complete"() {
        const data1 = [1, 2];
        const data2 = [1, 2, 3, 4];

        const expected = [[1, 1], [2, 2]];
        assert.deepEqual(expected,  toArray(zip([data1, data2])));
    },

     "zip can accept multiple iterables"() {
        const data1 = [1, 2, 3];
        const data2 = [4, 5, 6];
        const data3 = [7, 8, 9];

        const expected = [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ];

        assert.deepEqual(expected,  toArray(zip([data1, data2, data3])));
    },

     "zip iterator closing on all sequences if closed early"() {
        const iter1 = new CountClosing([1, 2, 3, 4]);
        const iter2 = new CountClosing([1, 2, 3, 4]);

        const seq = iterator(zip([iter1, iter2]));

         seq.next();
         seq.next();
         seq.return();

        assert.is(iter1.closed, 1);
        assert.is(iter2.closed, 1);
    },

     "zip iterator closing open iterators on sequence consumed"() {
        const iter1 = new CountClosing([1, 2]);
        const iter2 = new CountClosing([1, 2]);
        const iter3 = new CountClosing([1, 2, 3, 4]);

         toArray(zip([iter1, iter2, iter3]));

        assert.is(iter1.closed, 0);
        assert.is(iter2.closed, 0);
        assert.is(iter3.closed, 1);
    },
};
