import test from "ava";
import forEach from "./forEach.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";

test(
    "forEach calls the callback with each item in the sequence",
    async (t) => {
        const data = asyncIterableOf(["foo", "bar", "baz", "boz"]);
        const expected = [["foo", 0], ["bar", 1], ["baz", 2], ["boz", 3]];

        const result: Array<[string, number]> = [];

        await forEach(data, (item, index) => result.push([item, index]));

        t.deepEqual(expected, result);
    },
);

test(
    "forEach iterator closing on callback error",
    async (t) => {
        const out: Array<number> = [];
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await t.throwsAsync(() => forEach(iter, (value) => {
            if (value === 2) {
                throw new Error("Test");
            }
            out.push(value);
        }));
        t.deepEqual([1], out);
        t.is(1, iter.closed);
    },
);

