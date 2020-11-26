import test from "ava";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import toObject from "./toObject.js";

test(
    "toObject converts a sequence of pairs into an object",
    async (t) => {
        const pairs = asyncIterableOf<[string, number]>([
            ["foo", 4],
            ["bar", 9],
            ["baz", 32],
        ]);

        const obj = await toObject(pairs);

        t.is(null, Object.getPrototypeOf(obj));

        t.is(obj.foo, 4);
        t.is(obj.bar, 9);
        t.is(obj.baz, 32);
    },
);

test(
    "toObject overrides early values with later values of the same key",
    async (t) => {
        const pairs = asyncIterableOf<[string, number]>([
            ["foo", 2],
            ["baz", 4],
            ["boz", 5],
            ["foo", 3],
            ["foo", 7],
            ["bar", 1],
        ]);

        const obj = await toObject(pairs);

        t.is(obj.foo, 7);
        t.is(obj.baz, 4);
        t.is(obj.boz, 5);
        t.is(obj.bar, 1);
    },
);

