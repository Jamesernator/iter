import test from "ava";
import toObject from "./toObject.js";

test(
    "toObject converts a sequence of pairs into an object",
    (t) => {
        const pairs: Array<[string, number]> = [
            ["foo", 4],
            ["bar", 9],
            ["baz", 32],
        ];

        const obj = toObject(pairs);

        t.is(null, Object.getPrototypeOf(obj));

        t.is(obj.foo, 4);
        t.is(obj.bar, 9);
        t.is(obj.baz, 32);
    },
);

test(
    "toObject overrides early values with later values of the same key",
    (t) => {
        const pairs: Array<[string, number]> = [
            ["foo", 2],
            ["baz", 4],
            ["boz", 5],
            ["foo", 3],
            ["foo", 7],
            ["bar", 1],
        ];

        const obj = toObject(pairs);

        t.is(obj.foo, 7);
        t.is(obj.baz, 4);
        t.is(obj.boz, 5);
        t.is(obj.bar, 1);
    },
);

