import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";
import reject from "./reject.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

export const tests = {
    async "reject filters items for which the predice returns true"() {
        const data1 = [1, 2, 3, 4, 5, 6];

        assert.deepEqual([1, 3, 5], await toArray(reject(data1, (i) => i % 2 === 0)));

        const data2 = [1, 2, 3, 4];

        assert.deepEqual([3, 4], await toArray(reject(data2, (i, idx) => idx < 2)));
    },

    async "reject iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(reject(iter, (i) => i % 2 === 0));

        await seq.next();
        await seq.next();
        await seq.return();

        assert.is(iter.closed, 1);
    },

    async "reject iterator closing on predicate error"() {
        const iter = new CountClosing([1, 2, 3, 4]);

        await assert.throwsAsync(() => toArray(reject(iter, (i) => {
            if (i === 3) {
                throw new Error("Test");
            }
            return false;
        })));

        assert.is(iter.closed, 1);
    },
};
