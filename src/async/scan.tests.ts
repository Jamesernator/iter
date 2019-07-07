import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";
import scan from "./scan.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

function add(a: number, b: number) {
    return a + b;
}

export const tests = {
    async "scan returns a sequence of intermediate reductions"() {
        const data = [1, 2, 3, 4, 5];

        const expected = [1, 5, 14, 30, 55];

        assert.deepEqual(expected, await toArray(scan(data, (acc, i) => acc + i**2)));
    },

    async "scan throws an error if sequence is empty"() {
        const data: Array<number> = [];

        await assert.throwsAsync(() => toArray(scan(data, add)));
    },

    async "scan can accept a seed value which is used as the initial accumulator"() {
        const data = ["Cat", "Hat", "Bat"];

        const expected = ["Mat", "MatCat", "MatCatHat", "MatCatHatBat"];

        assert.deepEqual(expected, await toArray(scan(data, "Mat", (acc, item) => acc + item)));
    },

    async "can returns a sequence just of the initial value when given empty sequence"() {
        const data: Array<number> = [];

        assert.deepEqual([99], await toArray(scan(data, 99, add)));
    },

    async "scan iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(scan(iter, add));

        await seq.next();
        await seq.next();
        await seq.return();

        assert.is(iter.closed, 1);
    },

    async "scan iterator closing on reducer error"() {
        const iter = new CountClosing([1, 2, 3, 4]);

        await assert.throwsAsync(() => toArray(
            scan(iter, (acc, value) => {
                if (value === 3) {
                    throw new Error("Test");
                }
                return acc + value;
            }),
        ));

        assert.is(iter.closed, 1);
    },
};

