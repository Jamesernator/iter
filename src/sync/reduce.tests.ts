import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import reduce from "./reduce.js";

test(
    "reduce reduces the sequence using the given reducer",
    async (t) => {
        const data1 = asyncIterableOf(["Cat", "Hat", "Bat"]);

        t.is("CatHatHatBatBat", await reduce(
            data1,
            (acc, i) => acc + i.repeat(2),
        ));

        const data2 = asyncIterableOf(["Cat", "Hat", "Bat", "Rat"]);

        t.is("CatHatBatBatRatRatRat", await reduce(
            data2,
            (acc, i, idx) => acc + i.repeat(idx),
        ));
    },
);

test(
    "reduce with initial value calls the callback with that value initiall",
    async (t) => {
        const data = asyncIterableOf(["Cat", "Hat", "Bat"]);

        t.is("TatCatHatBat", await reduce(
            data,
            "Tat",
            (acc, item) => acc + item,
        ));
        t.deepEqual(
            ["Tat", "Cat", "Hat", "Bat"],
            await reduce(data, ["Tat"], (acc, item) => [...acc, item]),
        );
    },
);

test(
    "reduce without seed throws on empty sequence",
    async (t) => {
        const data = asyncIterableOf<number>([]);

        await t.throwsAsync(() => reduce(data, (a, b) => a + b));
    },
);

test(
    "reduce with seed returns it on empty sequence",
    async (t) => {
        const data = asyncIterableOf<number>([]);

        t.is(99, await reduce(data, 99, (a, b) => a + b));
    },
);

test(
    "reduce iterator closing on reducer error",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await t.throwsAsync(() => {
            return reduce(iter, (acc, value) => {
                if (value === 2) {
                    throw new Error("Test");
                }
                return acc + value;
            });
        });

        t.is(iter.closed, 1);
    },
);

export const tests = {



};
