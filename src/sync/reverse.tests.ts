import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";
import reverse from "./reverse.js";

export const tests = {
     "reverse returns the items in reverse order"() {
        const data = [1, 2, 3, 4];

        assert.deepEqual([4, 3, 2, 1],  toArray(reverse(data)));

        assert.deepEqual([],  toArray(reverse([])));
    },
};
