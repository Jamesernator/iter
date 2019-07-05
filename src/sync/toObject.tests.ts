import test from "ava";
import toObject from "./toObject.js";

test("toObject converts a sequence of arrays into a object", (t) => {
    const pairs: Array<[string, number]> = [
        ["foo", 4],
        ["bar", 9],
        ["baz", 32],
    ];

    function* values() {
        yield* pairs;
    }

    const obj = toObject(values());
    t.is(null, Object.getPrototypeOf(obj));
    t.deepEqual(obj, { foo: 4, bar: 9, baz: 32 });
});

test("toObject overrides early values with later values of the same key", (t) => {
    const pairs: Array<[string, number]> = [
        ["foo", 2],
        ["baz", 4],
        ["boz", 5],
        ["foo", 3],
        ["foo", 7],
        ["bar", 1],
    ];

    function* values() {
        yield* pairs;
    }

    const obj = toObject(values());
    t.deepEqual(obj, { foo: 7, baz: 4, boz: 5, bar: 1 });
});

