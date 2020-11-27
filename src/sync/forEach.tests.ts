import test from "ava";
import forEach from "./forEach.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "forEach calls the callback with each item in the sequence",
    (t) => {
        const data = ["foo", "bar", "baz", "boz"];
        const expected = [["foo", 0], ["bar", 1], ["baz", 2], ["boz", 3]];

        const result: Array<[string, number]> = [];

        forEach(data, (item, index) => result.push([item, index]));

        t.deepEqual(expected, result);
    },
);

test(
    "forEach iterator closing on callback error",
    (t) => {
        const out: Array<number> = [];
        const iter = new CountClosing([1, 2, 3, 4]);

        t.throws(() => forEach(iter, (value) => {
            if (value === 2) {
                throw new Error("Test");
            }
            out.push(value);
        }));
        t.deepEqual([1], out);
        t.is(1, iter.closed);
    },
);

