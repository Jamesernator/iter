import * as assert from "../lib/assert.js";
import reduce from "./reduce.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
     "reduce reduces the sequence using the given reducer"() {
        const data1 = ["Cat", "Hat", "Bat"];

        assert.is("CatHatHatBatBat",  reduce(data1, (acc, i) => acc + i.repeat(2)));

        const data2 = ["Cat", "Hat", "Bat", "Rat"];

        assert.is("CatHatBatBatRatRatRat",  reduce(data2, (acc, i, idx) => acc + i.repeat(idx)));
    },

     "reduce with initial value calls the callback with that value initiall"() {
        const data = ["Cat", "Hat", "Bat"];

        assert.is("TatCatHatBat",  reduce(data, "Tat", (acc, item) => acc + item));
        assert.deepEqual(["Tat", "Cat", "Hat", "Bat"],  reduce(data, ["Tat"], (acc, item) => [...acc, item]));
    },

     "reduce without seed throws on empty sequence"() {
        const data: Array<number> = [];

         assert.throws(() => reduce(data, (a, b) => a + b));
    },

     "reduce with seed returns it on empty sequence"() {
        const data: Array<number> = [];

        assert.is(99,  reduce(data, 99, (a, b) => a + b));
    },

     "reduce iterator closing on reducer error"() {
        const iter = new CountClosing([1, 2, 3, 4]);

         assert.throws(() => {
            return reduce(iter, (acc, value) => {
                if (value === 2) {
                    throw new Error("Test");
                }
                return acc + value;
            });
        });

        assert.is(iter.closed, 1);
    },
};
