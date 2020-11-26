import test from "ava";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import sampleOne from "./sampleOne.js";

test(
    "sampleOne returns an arbitrary element of the sequence",
    async (t) => {
        const data = [1, 2, 3, 4];
        const choice = await sampleOne(asyncIterableOf(data));

        t.is(typeof choice, "number");
        t.true(data.includes(choice));
    },
);

test(
    "sampleOne throws given an empty sequence",
    async (t) => {
        const data = asyncIterableOf([]);

        await t.throwsAsync(() => sampleOne(data));
    },
);

