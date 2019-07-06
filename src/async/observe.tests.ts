import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";
import observe from "./observe.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

export const tests = {
    async "observe invokes the function for each value in the sequence"() {
        const data = [1, 2, 3, 4];

        const copy: Array<[number, number]> = [];
        const observer = (value: number, i: number) => copy.push([value, i]);

        const items: Array<number> = [];
        for await (const item of observe(data, observer)) {
            items.push(item);
        }
        const expected = [[1, 0], [2, 1], [3, 2], [4, 3]];

        assert.deepEqual(expected, copy);
        assert.deepEqual(data, items);
    },

    async "observe is not called for items not consumed"() {
        const data = [1, 2, 3, 4];

        const observed: Array<number> = [];
        const observer = (value: number) => observed.push(value);
        const iter = iterator(observe(data, observer));

        await iter.next();
        await iter.next();
        await iter.return();

        assert.deepEqual([1, 2], observed);
    },

    async "observe logs to the console by default"() {
        const data = [1, 2, 3, 4];

        const observed: Array<number> = [];
        const originalLog = Object.getOwnPropertyDescriptor(console, "log")!;

        console.log = (value: number) => observed.push(value);

        for await (const _ of observe(data)) {
            // Just consume the iterator
        }

        assert.deepEqual(data, observed);

        Object.defineProperty(console, "log", originalLog);
    },

    async "iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(observe(iter, () => null));

        await seq.next();
        await seq.next();
        await seq.return();

        assert.is(iter.closed, 1);
    },

    async "iterator closing on observer error"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(observe(iter, (value) => {
            if (value === 2) {
                throw new Error("Test");
            }
        }));

        await assert.throwsAsync(async () => {
            for await (const _ of seq) {
                // Just consume the iterator
            }
        });

        assert.is(iter.closed, 1);
    },
};
