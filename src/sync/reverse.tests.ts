import test from "ava";
import reverse from "./reverse.js";
import toArray from "./toArray.js";

test(
    "reverse returns the items in reverse order",
    (t) => {
        const data = [1, 2, 3, 4];

        t.deepEqual([4, 3, 2, 1], toArray(reverse(data)));

        t.deepEqual([], toArray(reverse([])));
    },
);
