import test from "ava";
import flatMap from "./flatMap.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";
import iterator from "./iterator.js";
import toArray from "./toArray.js";


function* throwsError() {
    yield 4;
    throw new Error("Test");
}

test(
    "flatMap returns a flattened sequence of the values returned from the mapper",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4]);
        const expected = [1, 1, 2, 2, 3, 3, 4, 4];

        t.deepEqual(expected, await toArray(flatMap(data, (i) => [i, i])));
    },
);

test(
    "flatMap iterator closing",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf(
            [1, 2, 3, throwsError(), 5],
        ));
        const seq = iterator(flatMap(iter, (i) => [i, i]));

        await seq.next();
        await seq.next();
        await seq.return();

        t.is(iter.closed, 1);
    },
);

test(
    "flatMap iterator closing on mapper error",
    async (t) => {
        function throwErrorOn2(value: number) {
            if (value === 2) {
                throw new Error("Test");
            }
            return [value, value];
        }

        const iter = new CountClosing(asyncIterableOf([0, 1, 2, 3, 4]));
        const seq = iterator(flatMap(iter, throwErrorOn2));

        await t.throwsAsync(() => toArray(seq));

        t.is(1, iter.closed);
    },
);

