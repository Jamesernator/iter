import test from "ava";
import sampleOne from "./sampleOne.js";

test(
    "sampleOne returns an arbitrary element of the sequence",
    (t) => {
        const data = [1, 2, 3, 4];
        const choice = sampleOne(data);

        t.is(typeof choice, "number");
        t.true(data.includes(choice));
    },
);

test(
    "sampleOne throws given an empty sequence",
    (t) => {
        const data: Array<number> = [];

        t.throws(() => sampleOne(data));
    },
);

