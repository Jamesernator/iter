import * as assert from "../lib/assert.js";
import length from "./length.js";
import iterator from "./iterator.js";

export const tests = {
    async "length returns the length of the iterable"() {
        const data1 = [1, 2, 3, 4];
        const data2 = iterator([1, 2]);
        const data3: Array<number> = [];

        assert.is(4, await length(data1));
        assert.is(2, await length(data2));
        assert.is(0, await length(data2));
        assert.is(0, await length(data3));
    },
};
