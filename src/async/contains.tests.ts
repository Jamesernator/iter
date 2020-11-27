import test from "ava";
import contains from "./contains.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";

test(
    "contains defaults to Object.is",
    async (t) => {
        t.true(await contains(asyncIterableOf([1, 2, 3, 4]), 2));

        const o = {};
        t.true(await contains(asyncIterableOf([1, o, {}, NaN]), o));

        t.false(await contains(asyncIterableOf([-0, 4]), 0));

        t.true(await contains(asyncIterableOf([1, 2, NaN, "banana"]), NaN));

        t.false(await contains(asyncIterableOf([{}, "foo", 12]), {}));
    },
);

test(
    "contains with custom equality function",
    async (t) => {
        const data = asyncIterableOf<[number, number]>([[1, 2], [3, 4]]);

        function equals([x1, y1]: [number, number], [x2, y2]: [number, number]) {
            return x1 === x2 && y1 === y2;
        }

        t.true(await contains(data, [1, 2], equals));
        t.false(await contains(data, [9, 9], equals));
    },
);

test(
    "contains custom equality doesn't throw if value is found",
    async (t) => {
        const data = asyncIterableOf<[number, number]>(
            [[1, 2], [3, 4], [5, 6]],
        );

        function equals([x1, y1]: [number, number], [x2, y2]: [number, number]) {
            if (x1 === 5 && x2 === 6) {
                throw new Error("Test");
            }
            return x1 === x2 && y1 === y2;
        }

        t.true(await contains(data, [3, 4], equals));
        await t.notThrowsAsync(() => contains(data, [9, 9], equals));
    },
);

test(
    "contains iterator closing",
    async (t) => {
        const iter1 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await contains(iter1, 12);
        t.is(iter1.closed, 0);

        const iter2 = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        await contains(iter2, 2);
        t.is(iter2.closed, 1);
    },
);

