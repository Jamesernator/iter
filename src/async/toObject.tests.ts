import * as assert from "../lib/assert.js";
import toObject from "./toObject.js";

export const tests = {
    async "toObject converts a sequence of pairs into an object"() {
        const pairs: Array<[string, number]> = [
            ["foo", 4],
            ["bar", 9],
            ["baz", 32],
        ];

        const obj = await toObject(pairs);

        assert.is(null, Object.getPrototypeOf(obj));

        assert.is(obj.foo, 4);
        assert.is(obj.bar, 9);
        assert.is(obj.baz, 32);
    },

    async "toObject overrides early values with later values of the same key"() {
        const pairs: Array<[string, number]> = [
            ["foo", 2],
            ["baz", 4],
            ["boz", 5],
            ["foo", 3],
            ["foo", 7],
            ["bar", 1],
        ];

        const obj = await toObject(pairs);

        assert.is(obj.foo, 7);
        assert.is(obj.baz, 4);
        assert.is(obj.boz, 5);
        assert.is(obj.bar, 1);
    },
};
