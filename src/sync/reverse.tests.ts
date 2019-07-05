import test from "ava";
import toArray from "./toArray.js";
import reverse from "./reverse.js";

test("reverse basic functionality", (t) => {
    const data = [1, 2, 3, 4];

    t.deepEqual(
        toArray(reverse(data)),
        [4, 3, 2, 1],
    );

    t.deepEqual(
        toArray(reverse([])),
        [],
    );

    t.deepEqual(
        toArray(reverse("cats")),
        ["s", "t", "a", "c"],
    );
});

