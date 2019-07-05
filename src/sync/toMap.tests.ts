import test from "ava";
import toMap from "./toMap.js";

test("toMap converts a sequence of arrays into a map", (t) => {
    const pairs: Array<[number, string]> = [[1, "foo"], [3, "bar"], [4, "boz"]];

    function* values() {
        yield* pairs;
    }

    const map = toMap(values());

    t.true(map instanceof Map);

    t.is(map.size, 3);
    t.is(map.get(1), "foo");
    t.is(map.get(3), "bar");
    t.is(map.get(4), "boz");
});

test("toMap overrides early values with later values of the same key", (t) => {
    const pairs: Array<[number, string]> = [
        [1, "foo"],
        [3, "bar"],
        [4, "baz"],
        [1, "qux"],
        [1, "boz"],
        [2, "bah"],
    ];

    function* values() {
        yield* pairs;
    }

    const map = toMap(values());
    t.is(map.get(1), "boz");
    t.is(map.get(2), "bah");
    t.is(map.get(3), "bar");
    t.is(map.get(4), "baz");
});
