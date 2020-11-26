import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import scan from "./scan.js";
import toArray from "./toArray.js";

function add(a: number, b: number) {
    return a + b;
}

test(
    "scan returns a sequence of intermediate reductions",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4, 5]);

        const expected = [1, 5, 14, 30, 55];

        t.deepEqual(expected, await toArray(
            scan(data, (acc, i) => acc + i**2),
        ));
    },
);

test(
    "scan throws an error if sequence is empty",
    async (t) => {
        const data = asyncIterableOf<number>([]);

        await t.throwsAsync(() => toArray(scan(data, add)));
    },
);

test(
    "scan can accept a seed value which is used as the initial accumulator",
    async (t) => {
        const data = asyncIterableOf(["Cat", "Hat", "Bat"]);

        const expected = ["Mat", "MatCat", "MatCatHat", "MatCatHatBat"];

        t.deepEqual(expected, await toArray(
            scan(data, "Mat", (acc, item) => acc + item),
        ));
    },
);

test(
    "scan returns a sequence just of the initial value when given empty sequence",
    async (t) => {
        const data = asyncIterableOf<number>([]);

        t.deepEqual([99], await toArray(scan(data, 99, add)));
    },
);

test(
    "scan iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));
        const seq = iterator(scan(iter, add));

        await seq.next();
        await seq.next();
        await seq.return();

        t.is(iter.closed, 1);
    },
);

test(
    "scan iterator closing on reducer error",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await t.throwsAsync(() => toArray(
            scan(iter, (acc, value) => {
                if (value === 3) {
                    throw new Error("Test");
                }
                return acc + value;
            }),
        ));

        t.is(iter.closed, 1);
    },
);
