import test from "ava";
import toArray from "./toArray.js";
import unique from "./unique.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

class PointSet {
    private _set = new Set<string>();

    add(point: { x: number, y: number}) {
        this._set.add(`${ point.x }/${ point.y }`);
    }

    has(point: { x: number, y: number }) {
        return this._set.has(`${ point.x }/${ point.y }`);
    }

    * values() {
        for (const string of this._set) {
            const [x, y] = string.split("/");
            yield { x: Number(x), y: Number(y) };
        }
    }
}

test("unique doesn't emit items it's already seen before", (t) => {
    const data = [1, 2, 3, 4, 1, 2, 5];

    t.deepEqual(
        [1, 2, 3, 4, 5],
        toArray(unique(data)),
    );
});

test("unique compares by Object.is by default", (t) => {
    const data = [NaN, 1, 2, NaN, 3, NaN];

    t.deepEqual(
        [NaN, 1, 2, 3],
        toArray(unique(data)),
    );
});

test("unique can use a custom set type for comparing equality", (t) => {
    const data = [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
        { x: 5, y: 6 },
        { x: 1, y: 2 },
        { x: 3, y: 4 },
        { x: 7, y: 8 },
    ];

    t.deepEqual(
        data,
        toArray(unique(data)),
    );

    t.deepEqual(
        [
            { x: 1, y: 2 },
            { x: 3, y: 4 },
            { x: 5, y: 6 },
            { x: 7, y: 8 },
        ],
        toArray(unique(data, () => new PointSet())),
    );
});

test("unique iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(unique(data));

    seq.next();
    seq.return!();
    t.is(data.closed, 1);
});

test("unique iterator closing on set method error", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const set = {
        add() { throw new Error("Error"); },
        has() { throw new Error("Error"); },
    };
    const seq = iterator(unique(data, () => set));

    t.throws(() => seq.next());
    t.is(data.closed, 1);
});
