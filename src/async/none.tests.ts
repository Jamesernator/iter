import * as assert from "../lib/assert.js";
import none from "./none.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    async "none returns true if no item matches the predicate"() {
        const isEven = (i: number) => i % 2 === 0;

        const data1 = [1, 3, 5, 7, 9];
        const data2 = [1, 2, 3, 4, 5];
        const data3 = [2, 4, 6, 8];

        assert.isTrue(await none(data1, isEven));
        assert.isFalse(await none(data2, isEven));
        assert.isFalse(await none(data3, isEven));
    },

    async "none is vacuously true"() {
        const isEven = (i: number) => i % 2 === 0;

        assert.isTrue(await none([], isEven));
    },

    async "none defaults to identity for truthiness"() {
        const data1 = [0, false, "", null, undefined];
        const data2 = [0, false, "bar", "", null, undefined];
        const data3 = ["foo", {}, 12];

        assert.isTrue(await none(data1));
        assert.isFalse(await none(data2));
        assert.isFalse(await none(data3));
    },

    async "none iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);

        await none(iter, (i) => i === 2);
        assert.is(iter.closed, 1);
    },

    async "none iterator closing on predicate error"() {
        const iter = new CountClosing([1, 2, 3, 4]);

        await assert.throwsAsync(() => {
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

