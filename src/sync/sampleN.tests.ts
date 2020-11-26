import test from "ava";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import sampleN from "./sampleN.js";

test(
    "sampleN returns an arbitrary array of items from the sequence of size n",
    async (t) => {
        const data = [1, 2, 3, 4, 5];

        for (let i = 0; i < 10; i+=1) {
            const choice = await sampleN(asyncIterableOf(data), 3);

            t.true(Array.isArray(choice));
            t.is(choice.length, 3);

            for (const element of choice) {
                t.true(data.includes(element));
            }

            t.is(choice.length, new Set(choice).size);
        }
    },
);

test(
    "sampleN on a sequence too short throws an error",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3]);

        await t.throwsAsync(() => sampleN(data, 5));
    },
);

test(
    "sampleN on a sequence too short returns the whole sequence if allowShorter is true",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3]);

        t.deepEqual([1, 2, 3], await sampleN(data, 11, true));
    },
);
