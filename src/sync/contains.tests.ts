import * as assert from "../lib/assert.js";
import contains from "./contains.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "contains defaults to Object.is"() {
        assert.isTrue( contains([1, 2, 3, 4], 2));

        const o = {};
        assert.isTrue( contains([1, o, {}, NaN], o));

        assert.isFalse( contains([-0, 4], 0));

        assert.isTrue( contains([1, 2, NaN, "banana"], NaN));

        assert.isFalse( contains([{}, "foo", 12], {}));
    },

     "contains with custom equality function"() {
        const data: Array<[number, number]> = [[1, 2], [3, 4]];

        function equals([x1, y1]: [number, number], [x2, y2]: [number, number]) {
            return x1 === x2 && y1 === y2;
        }

        assert.isTrue( contains(data, [1, 2], equals));
        assert.isFalse( contains(data, [9, 9], equals));
    },

     "contains custom equality doesn't throw if value is found"() {
        const data: Array<[number, number]> = [[1, 2], [3, 4], [5, 6]];

        function equals([x1, y1]: [number, number], [x2, y2]: [number, number]) {
            if (x1 === 5 && x2 === 6) {
                throw new Error("Test");
            }
            return x1 === x2 && y1 === y2;
        }

        assert.isTrue( contains(data, [3, 4], equals));
         assert.throws(() => contains(data, [9, 9], equals));
    },

     "contains iterator closing"() {
        const iter1 = new CountClosing([1, 2, 3, 4]);

         contains(iter1, 12);
        assert.is(iter1.closed, 0);

        const iter2 = new CountClosing([1, 2, 3, 4]);

         contains(iter2, 2);
        assert.is(iter2.closed, 1);
    },
};
