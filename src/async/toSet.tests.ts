import * as assert from "../lib/assert.js";
import toSet from "./toSet.js";

export const tests ={
    async "toSet returns a set from the given sequence"() {
        const data = [1, 2, 3, 4, 3, 3, 2];

        const set = await toSet(data);

        assert.isTrue(set instanceof Set);
        assert.is(set.size, 4);

        assert.isTrue(set.has(1));
        assert.isTrue(set.has(2));
        assert.isTrue(set.has(3));
        assert.isTrue(set.has(4));
    },
};
