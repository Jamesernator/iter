import * as assert from "../lib/assert.js";
import toMap from "./toMap.js";

export const tests = {
    async "toMap converts a sequence of pairs into a map"() {
        const pairs: Array<[number, string]> = [
            [1, "foo"],
            [3, "bar"],
            [4, "boz"],
        ];

        const map = await toMap(pairs);

        assert.isTrue(map instanceof Map);
        assert.is(map.size, 3);
        assert.is(map.get(1), "foo");
        assert.is(map.get(3), "bar");
        assert.is(map.get(4), "boz");
    },

    async "toMap overrides early values with later values of the same key"() {
        const pairs: Array<[number, string]> = [
            [1, "foo"],
            [3, "bar"],
            [4, "baz"],
            [1, "qux"],
            [1, "boz"],
            [2, "bah"],
        ];

        const map = await toMap(pairs);

        assert.is(map.size, 4);
        assert.is(map.get(1), "boz");
        assert.is(map.get(2), "bah");
        assert.is(map.get(3), "bar");
        assert.is(map.get(4), "baz");
    },
};
