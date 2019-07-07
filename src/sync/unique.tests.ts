import * as assert from "../lib/assert.js";
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

export const tests = {
     "unique doesn't emit items already emitted"() {
        const data = [1, 2, 3, 4, 1, 2, 5];
        const expected = [1, 2, 3, 4, 5];

        assert.deepEqual(expected,  toArray(unique(data)));
    },

     "unique can use a custom set type for storing data"() {
        const makeSet = () => new PointSet();

        const data = [
            { x: 10, y: 20 },
            { x: 10, y: 30 },
            { x: 10, y: 20 },
            { x: 20, y: 10 },
            { x: 20, y: 30 },
            { x: 30, y: 40 },
            { x: 30, y: 40 },
        ];

        const expected = [
            { x: 10, y: 20 },
            { x: 10, y: 30 },
            { x: 20, y: 10 },
            { x: 20, y: 30 },
            { x: 30, y: 40 },
        ];

        assert.deepEqual(expected,  toArray(unique(data, makeSet)));
    },

     "unique iterator closing"() {
        const iter = new CountClosing([1, 2, 3, 4]);
        const seq = iterator(unique(iter));

         seq.next();
         seq.next();
         seq.return();

        assert.is(iter.closed, 1);
    },

     "unique iterator closing on set method error"() {
        const iter = new CountClosing([1, 2, 3, 4]);

        const set = {
            add(i: number) {
                if (i === 3) {
                    throw new Error("Test");
                }
            },

            has() {
                return false;
            },
        };

        const seq = iterator(unique(iter, () => set));

         seq.next();
         seq.next();
         assert.throws(() => seq.next());

        assert.is(iter.closed, 1);
    },
};
