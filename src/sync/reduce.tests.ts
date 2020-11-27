import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import reduce from "./reduce.js";

test(
    "reduce reduces the sequence using the given reducer",
    (t) => {
        const data1 = ["Cat", "Hat", "Bat"];

        t.is("CatHatHatBatBat", reduce(
            data1,
            (acc, i) => acc + i.repeat(2),
        ));

        const data2 = ["Cat", "Hat", "Bat", "Rat"];

        t.is("CatHatBatBatRatRatRat", reduce(
            data2,
            (acc, i, idx) => acc + i.repeat(idx),
        ));
    },
);

test(
    "reduce with initial value calls the callback with that value initiall",
    (t) => {
        const data = ["Cat", "Hat", "Bat"];

        t.is("TatCatHatBat", reduce(
            data,
            "Tat",
            (acc, item) => acc + item,
        ));
        t.deepEqual(
            ["Tat", "Cat", "Hat", "Bat"],
            reduce(data, ["Tat"], (acc, item) => [...acc, item]),
        );
    },
);

test(
    "reduce without seed throws on empty sequence",
    (t) => {
        const data: Array<number> = [];

        t.throws(() => reduce(data, (a, b) => a + b));
    },
);

test(
    "reduce with seed returns it on empty sequence",
    (t) => {
        const data: Array<number> = [];

        t.is(99, reduce(data, 99, (a, b) => a + b));
    },
);

test(
    "reduce iterator closing on reducer error",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);

        t.throws(() => {
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

