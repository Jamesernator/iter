import test from "ava";
import toSet from "./toSet.js";

test(
    "toSet returns a set from the given sequence",
    (t) => {
        const data = [1, 2, 3, 4, 3, 3, 2];

        const set = toSet(data);

        t.true(set instanceof Set);
        t.is(set.size, 4);

        t.true(set.has(1));
        t.true(set.has(2));
        t.true(set.has(3));
        t.true(set.has(4));
    },
);
