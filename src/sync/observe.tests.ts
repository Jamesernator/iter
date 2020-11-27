import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";
import observe from "./observe.js";

test(
    "observe invokes the function for each value in the sequence",
    (t) => {
        const data = [1, 2, 3, 4];

        const copy: Array<[number, number]> = [];
        const observer = (value: number, i: number) => copy.push([value, i]);

        const items: Array<number> = [];
        for (const item of observe(data, observer)) {
            items.push(item);
        }
        const expected = [[1, 0], [2, 1], [3, 2], [4, 3]];

        t.deepEqual(expected, copy);
        t.deepEqual(data, items);
    },
);

test(
    "observe is not called for items not consumed",
    (t) => {
        const data = [1, 2, 3, 4];

        const observed: Array<number> = [];
        const observer = (value: number) => observed.push(value);
        const iter = iterator(observe(data, observer));

        iter.next();
        iter.next();
        iter.return();

        t.deepEqual([1, 2], observed);
    },
);


test(
    "observe logs to the console by default",
    (t) => {
        const data = [1, 2, 3, 4];

        const observed: Array<number> = [];
        const originalLog = Object.getOwnPropertyDescriptor(console, "log")!;

        console.log = (value: number) => observed.push(value);

        // eslint-disable-next-line @typescript-eslint/naming-convention
        for (const _ of observe(data)) {
            // Just consume the iterator
        }

        t.deepEqual(data, observed);

        Object.defineProperty(console, "log", originalLog);
    },
);

test(
    "iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(observe(iter, () => null));

        seq.next();
        seq.next();
        seq.return();

        t.is(iter.closed, 1);
    },

);

test(
    "iterator closing on observer error",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(observe(iter, (value) => {
            if (value === 2) {
                throw new Error("Test");
            }
        }));

        t.throws( () => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            for (const _ of seq) {
                // Just consume the iterator
            }
        });

        t.is(iter.closed, 1);
    },
);
