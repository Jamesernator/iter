import test from "ava";
import findIndex from "./findIndex.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    async "findIndex returns the first index of a given item"() {
        const data = [1, 2, 3, 4];

        assert.is(2, await findIndex(data, (i) => i === 3));
    },

    async "findIndex throws an error if no item is found"() {
        const data = [1, 2, 3, 4];

        await assert.throwsAsync(() => findIndex(data, (x) => x === 42));
    },

    async "findIndex with no argument returns the first index for which the value is truthy"() {
        const data = [0, false, undefined, "", null, "foo", 0, null];

        assert.is(5, await findIndex(data));
    },

    async "findIndex returns the default value if not found"() {
        const data = [1, 2, 3, 4];

        assert.is(-1, await findIndex(data, -1, (x) => x > 12));
        assert.is(null, await findIndex(data, null, (x) => x > 12));
    },

    async "findIndex iterator closing"() {
        const iter1 = new CountClosing([1, 2, 3, 4]);

        await findIndex(iter1, 99, (x) => x > 5);
        assert.is(0, iter1.closed);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        await findIndex(iter2, 99, (x) => x === 2);
        assert.is(1, iter2.closed);

        const iter3 = new CountClosing([1, 2, 3, 4]);
        await assert.throwsAsync(() => findIndex(iter3, (x) => {
            if (x === 2) {
                throw new Error("Test");
            }
        }));
        assert.is(1, iter3.closed);
    },
};
