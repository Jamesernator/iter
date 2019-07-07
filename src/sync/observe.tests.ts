import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";
import observe from "./observe.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

export const tests = {
     "observe invokes the function for each value in the sequence"() {
        const data = [1, 2, 3, 4];

        const copy: Array<[number, number]> = [];
        const observer = (value: number, i: number) => copy.push([value, i]);

        const items: Array<number> = [];
        for  (const item of observe(data, observer)) {
            items.push(item);
        }
        const expected = [[1, 0], [2, 1], [3, 2], [4, 3]];

        assert.deepEqual(expected, copy);
        assert.deepEqual(data, items);
    },

     "observe is not called for items not consumed"() {
        const data = [1, 2, 3, 4];

        const observed: Array<number> = [];
        const observer = (value: number) => observed.push(value);
        const iter = iterator(observe(data, observer));

         iter.next();
         iter.next();
         iter.return();

        assert.deepEqual([1, 2], observed);
    },

     "observe logs to the console by default"() {
        const data = [1, 2, 3, 4];

        const observed: Array<number> = [];
        const originalLog = Object.getOwnPropertyDescriptor(console, "log")!;

        console.log = (value: number) => observed.push(value);

        for  (const _ of observe(data)) {
            // Just consume the iterator
        }

        assert.deepEqual(data, observed);

        Object.defineProperty(console, "log", originalLog);
    },

     "iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(observe(iter, () => null));

         seq.next();
         seq.next();
         seq.return();

        assert.is(iter.closed, 1);
    },

     "iterator closing on observer error"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(observe(iter, (value) => {
            if (value === 2) {
                throw new Error("Test");
            }
        }));

         assert.throws( () => {
            for  (const _ of seq) {
                // Just consume the iterator
            }
        });

        assert.is(iter.closed, 1);
    },
};
