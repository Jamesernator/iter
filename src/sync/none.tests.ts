import * as assert from "../lib/assert.js";
import none from "./none.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "none returns true if no item matches the predicate"() {
        const isEven = (i: number) => i % 2 === 0;

        const data1 = [1, 3, 5, 7, 9];
        const data2 = [1, 2, 3, 4, 5];
        const data3 = [2, 4, 6, 8];

        assert.isTrue( none(data1, isEven));
        assert.isFalse( none(data2, isEven));
        assert.isFalse( none(data3, isEven));
    },

     "none is vacuously true"() {
        const isEven = (i: number) => i % 2 === 0;

        assert.isTrue( none([], isEven));
    },

     "none defaults to identity for truthiness"() {
        const data1 = [0, false, "", null, undefined];
        const data2 = [0, false, "bar", "", null, undefined];
        const data3 = ["foo", {}, 12];

        assert.isTrue( none(data1));
        assert.isFalse( none(data2));
        assert.isFalse( none(data3));
    },

     "none iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);

         none(iter, (i) => i === 2);
        assert.is(iter.closed, 1);
    },

     "none iterator closing on predicate error"() {
        const iter = new CountClosing([1, 2, 3, 4]);

         assert.throws(() => {
            return none(iter, (i) => {
                if (i === 2) {
                    throw new Error("Test");
                }
                return false;
            });
        });
        assert.is(iter.closed, 1);
    },
};

