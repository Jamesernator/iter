import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";
import scan from "./scan.js";
import toArray from "./toArray.js";

function add(a: number, b: number) {
    return a + b;
}

test(
    "scan returns a sequence of intermediate reductions",
    (t) => {
        const data = [1, 2, 3, 4, 5];

        const expected = [1, 5, 14, 30, 55];

        t.deepEqual(expected, toArray(
            scan(data, (acc, i) => acc + i**2),
        ));
    },
);

test(
    "scan throws an error if sequence is empty",
    (t) => {
        const data: Array<number> = [];

        t.throws(() => toArray(scan(data, add)));
    },
);

test(
    "scan can accept a seed value which is used as the initial accumulator",
    (t) => {
        const data = ["Cat", "Hat", "Bat"];

        const expected = ["Mat", "MatCat", "MatCatHat", "MatCatHatBat"];

        t.deepEqual(expected, toArray(
            scan(data, "Mat", (acc, item) => acc + item),
        ));
    },
);

test(
    "scan returns a sequence just of the initial value when given empty sequence",
    (t) => {
        const data: Array<number> = [];

        t.deepEqual([99], toArray(scan(data, 99, add)));
    },
);

test(
    "scan iterator closing",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(scan(iter, add));

        seq.next();
        seq.next();
        seq.return();

        t.is(iter.closed, 1);
    },
);

test(
    "scan iterator closing on reducer error",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4]);

        t.throws(() => toArray(
            scan(iter, (acc, value) => {
                if (value === 3) {
                    throw new Error("Test");
                }
                return acc + value;
            }),
        ));

        t.is(iter.closed, 1);
    },
);
