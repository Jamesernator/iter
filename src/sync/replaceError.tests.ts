import * as assert from "../lib/assert.js";
import replaceError from "./replaceError.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

export const tests = {
    "replaceError can replace an error with another sequence"() {
        function* seq() {
            yield 1;
            yield 2;
            throw new Error("Test");
        }

        const expected = [1, 2, 3, 4];

        assert.deepEqual(expected, toArray(replaceError(seq(), () => [3, 4])));
    },

    "replaceError will throw error from second sequence"() {
        function* seq1() {
            yield 1;
            yield 2;
            throw new Error("Test");
        }

        function* seq2() {
            yield 3;
            throw new Error("Test");
        }

        const seen: Array<number> = [];

        assert.throws( () => {
            for (const item of replaceError(seq1(), () => seq2())) {
                seen.push(item);
            }
        });

        assert.deepEqual([1, 2, 3], seen);
    },

    "replaceError iterator closing"() {
        function* seq() {
            yield 1;
            yield 2;
            throw new Error("Test");
        }

        const iter = new CountClosing(replaceError(seq(), () => [3, 4]));

        iter.next();
        iter.next();
        iter.return();

        assert.is(iter.closed, 1);
    },

    "replaceError iterator closing on replaced sequence"() {
        let closed1: boolean = false;
        let earlyClosed: boolean = true;
        function* seq1() {
            try {
                yield 1;
                yield 2;
                earlyClosed = false;
                throw new Error("Test");
            } finally {
                closed1 = true;
            }
        }

        let closed2: boolean = false;
        function* seq2() {
            try {
                yield 3;
                yield 4;
            } finally {
                closed2 = true;
            }
        }

        const iter = iterator(replaceError(seq1(), () => seq2()));

        iter.next();
        iter.next();
        iter.next();
        iter.return();

        assert.isTrue(closed1);
        assert.isFalse(earlyClosed);
        assert.isTrue(closed2);
    },
};
