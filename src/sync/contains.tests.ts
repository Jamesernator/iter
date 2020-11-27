import test from "ava";
import contains from "./contains.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "contains defaults to Object.is",
    (t) => {
        t.true(contains([1, 2, 3, 4], 2));

        const o = {};
        t.true(contains([1, o, {}, NaN], o));

        t.false(contains([-0, 4], 0));

        t.true(contains([1, 2, NaN, "banana"], NaN));

        t.false(contains([{}, "foo", 12], {}));
    },
);

test(
    "contains with custom equality function",
    (t) => {
        const data: Array<[number, number]> = [[1, 2], [3, 4]];

        function equals([x1, y1]: [number, number], [x2, y2]: [number, number]) {
            return x1 === x2 && y1 === y2;
        }

        t.true(contains(data, [1, 2], equals));
        t.false(contains(data, [9, 9], equals));
    },
);

test(
    "contains custom equality doesn't throw if value is found",
    (t) => {
        const data: Array<[number, number]> =
            [[1, 2], [3, 4], [5, 6]];
        function equals([x1, y1]: [number, number], [x2, y2]: [number, number]) {
            if (x1 === 5 && x2 === 6) {
                throw new Error("Test");
            }
            return x1 === x2 && y1 === y2;
        }

        t.true(contains(data, [3, 4], equals));
        t.notThrows(() => contains(data, [9, 9], equals));
    },
);

test(
    "contains iterator closing",
    (t) => {
        const iter1 = new CountClosing([1, 2, 3, 4]);

        contains(iter1, 12);
        t.is(iter1.closed, 0);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        contains(iter2, 2);
        t.is(iter2.closed, 1);
    },
);

