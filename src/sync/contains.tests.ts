import test from "ava";
import contains from "./contains.js";
import CountClosing from "./helpers/CountClosing.js";

test("contains default Object.is", (t) => {
    t.true(
        contains([1, 2, 3, 4], 2),
    );
    const x = {};
    t.true(
        contains([x, {}, NaN], x),
    );

    t.true(
        contains([0, 4], 0),
    );

    t.false(
        contains([-0, 4], 0),
    );
    t.true(
        contains([3, NaN, "banana"], NaN),
    );

    t.false(
        contains([{}, "foo", NaN], x),
    );
});

test("contains custom equality", (t) => {
    const data: Array<[number, number]> = [[1, 2], [3, 4]];
    const equals = ([x1, y1]: [number, number], [x2, y2]: [number, number]) => {
        return Object.is(x1, x2) && Object.is(y1, y2);
    };
    t.true(
        contains(data, [1, 2], equals),
    );

    t.false(
        contains(data, [4, 5], equals),
    );
});

test("contains custom equality doesn't throw if value found before throwing case", (t) => {
    const data: Array<[number, number]> = [[5, 6], [1, 2], [9, 9]];
    const equals = ([x1, y1]: [number, number], [x2, y2]: [number, number]) => {
        if (x1 === 9 && x2 === 9) {
            throw new Error("Test");
        }
        return Object.is(x1, x2) && Object.is(y1, y2);
    };

    t.true(
        contains(data, [1, 2], equals),
    );
});

test("iterator closing", (t) => {
    const d1 = new CountClosing([1, 2, 3, 4]);

    contains(d1, 12);
    t.is(d1.closed, 0);

    contains(d1, 2);
    t.is(d1.closed, 1);
});
