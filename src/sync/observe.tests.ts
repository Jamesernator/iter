import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import observe from "./observe.js";

test(
    "observe invokes the function for each value in the sequence",
    async (t) => {
        const data = [1, 2, 3, 4];

        const copy: Array<[number, number]> = [];
        const observer = (value: number, i: number) => copy.push([value, i]);

        const items: Array<number> = [];
        for await (const item of observe(asyncIterableOf(data), observer)) {
            items.push(item);
        }
        const expected = [[1, 0], [2, 1], [3, 2], [4, 3]];

        t.deepEqual(expected, copy);
        t.deepEqual(data, items);
    },
);

test(
    "observe is not called for items not consumed",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4]);

        const observed: Array<number> = [];
        const observer = (value: number) => observed.push(value);
        const iter = iterator(observe(data, observer));

        await iter.next();
        await iter.next();
        await iter.return();

        t.deepEqual([1, 2], observed);
    },
);


test(
    "observe logs to the console by default",
    async (t) => {
        const data = [1, 2, 3, 4];

        const observed: Array<number> = [];
        const originalLog = Object.getOwnPropertyDescriptor(console, "log")!;

        console.log = (value: number) => observed.push(value);

        // eslint-disable-next-line @typescript-eslint/naming-convention
        for await (const _ of observe(asyncIterableOf(data))) {
            // Just consume the iterator
        }

        t.deepEqual(data, observed);

        Object.defineProperty(console, "log", originalLog);
    },
);

test(
    "iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));
        const seq = iterator(observe(iter, () => null));

        await seq.next();
        await seq.next();
        await seq.return();

        t.is(iter.closed, 1);
    },

);

test(
    "iterator closing on observer error",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));
        const seq = iterator(observe(iter, (value) => {
            if (value === 2) {
                throw new Error("Test");
            }
        }));

        await t.throwsAsync(async () => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            for await (const _ of seq) {
                // Just consume the iterator
            }
        });

        t.is(iter.closed, 1);
    },
);

export const tests = {


};
