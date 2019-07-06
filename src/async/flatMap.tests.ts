import * as assert from "../lib/assert.js";
import flatMap from "./flatMap.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";


function* throwsError() {
    yield 4;
    throw new Error("Test");
}

export const tests = {
    async "flatMap returns a flattened sequence of the values returned from the mapper"() {
        const data = [1, 2, 3, 4];
        const expected = [1, 1, 2, 2, 3, 3, 4, 4];

        assert.deepEqual(expected, await toArray(flatMap(data, (i) => [i, i])));
    },

    async "flatMap iterator closing"() {
        const iter = new CountClosing([1, 2, 3, throwsError(), 5]);
        const seq = iterator(flatMap(iter, (i) => [i, i]));

        await seq.next();
        await seq.next();
        await seq.return();

        assert.is(iter.closed, 1);
    },

    async "flatMap iterator closing on mapper error"() {
        function throwErrorOn2(value: number) {
            if (value === 2) {
                throw new Error("Test");
            }
            return [value, value];
        }

        const iter = new CountClosing([0, 1, 2, 3, 4]);
        const seq = iterator(flatMap(iter, throwErrorOn2));

        await assert.throwsAsync(() => toArray(seq));

        assert.is(1, iter.closed);
    },
};
