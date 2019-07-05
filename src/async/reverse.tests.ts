import test from "ava";
import toArray from "./toArray.js";
import reverse from "./reverse.js";

test("reverse basic functionality", async (t) => {
    const data = [1, 2, 3, 4];

    t.deepEqual(
        await toArray(reverse(data)),
        [4, 3, 2, 1],
    );

    t.deepEqual(
        await toArray(reverse([])),
        [],
    );

    t.deepEqual(
        await toArray(reverse("cats")),
        ["s", "t", "a", "c"],
    );
});

