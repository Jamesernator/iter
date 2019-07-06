import * as assert from "../lib/assert.js";
import replaceError from "./replaceError.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    async "replaceError can replace an error with another sequence"() {
        async function* seq() {
            yield 1;
            yield 2;
            throw new Error("Test");
        }

        const expected = [1, 2, 3, 4];

        assert.deepEqual(expected, await toArray(replaceError(seq(), async () => [3, 4])));
    },

    async "replaceError will throw error from second sequence"() {
        async function* seq1() {
            yield 1;
            yield 2;
            throw new Error("Test");
        }

        async function* seq2() {
            yield 3;
            throw new Error("Test");
        }

        const seen: Array<number> = [];

        await assert.throwsAsync(async () => {
            for await (const item of replaceError(seq1(), () => seq2())) {
                seen.push(item);
            }
        });

        assert.deepEqual([1, 2, 3], seen);
    },

    async "replaceError iterator closing"() {
        async function* seq() {
            yield 1;
            yield 2;
            throw new Error("Test");
        }

        const iter = new CountClosing(replaceError(seq(), () => [3, 4]));

        await iter.next();
        await iter.next();
        await iter.return();

        assert.is(iter.closed, 1);
    },

    async "replaceError iterator closing on replaced sequence"() {
        async function* seq1() {
            yield 1;
            yield 2;
            throw new Error("Test");
        }

        let closed: boolean = false;
        async function* seq2() {
            try {
                yield 3;
                yield 4;
            } finally {
                closed = true;
            }
        }

        const iter = new CountClosing(replaceError(seq1(), () => seq2()));

        await iter.next();
        await iter.next();
        await iter.next();
        await iter.return();

        assert.is(iter.closed, 1);
        assert.isTrue(closed);
    },
};
