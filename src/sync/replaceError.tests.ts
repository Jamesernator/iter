import test from "ava";
import CountClosing from "./helpers/CountClosing.js";
import replaceError from "./replaceError.js";
import toArray from "./toArray.js";

test(
    "replaceError can replace an error with another sequence",
    (t) => {
        function* seq() {
            yield 1;
            yield 2;
            throw new Error("Test");
        }

        const expected = [1, 2, 3, 4];

        t.deepEqual(
            expected,
            toArray(replaceError(seq(), () => {
                return [3, 4];
            })),
        );
    },
);

test(
    "replaceError will throw error from second sequence",
    (t ) => {
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

        t.throws(() => {
            for (const item of replaceError(seq1(), () => seq2())) {
                seen.push(item);
            }
        });

        t.deepEqual([1, 2, 3], seen);
    },
);

test(
    "replaceError iterator closing",
    (t) => {
        function* seq() {
            yield 1;
            yield 2;
            throw new Error("Test");
        }

        const iter = new CountClosing(replaceError(seq(), () => [3, 4]));

        iter.next();
        iter.next();
        iter.return();

        t.is(iter.closed, 1);
    },
);

test(
    "replaceError iterator closing on replaced sequence",
    (t) => {
        function* seq1() {
            yield 1;
            yield 2;
            throw new Error("Test");
        }

        let closed: boolean = false;
        function* seq2() {
            try {
                yield 3;
                yield 4;
            } finally {
                closed = true;
            }
        }

        const iter = new CountClosing(replaceError(seq1(), () => seq2()));

        iter.next();
        iter.next();
        iter.next();
        iter.return();

        t.is(iter.closed, 1);
        t.true(closed);
    },
);

