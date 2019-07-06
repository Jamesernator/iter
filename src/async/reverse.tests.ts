import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";
import reverse from "./reverse.js";

export const tests = {
    async "reverse returns the items in reverse order"() {
        const data = [1, 2, 3, 4];

        assert.deepEqual([4, 3, 2, 1], await toArray(reverse(data)));

        assert.deepEqual([], await toArray(reverse([])));
    },
};
