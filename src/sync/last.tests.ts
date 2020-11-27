import test from "ava";
import last from "./last.js";

test(
    "last returns the last item of the sequence",
    (t) => {
        t.is(4, last([1, 2, 3, 4]));

        t.is("banana", last([2, "banana", 34, "banana"]));
    },
);

test(
    "last throws error with empty sequence",
    (t) => {
        t.throws(() => last([]));
    },
);

