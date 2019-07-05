import test from "ava";
import replaceError from "./replaceError.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

test("replaceError can replace an error with another sequence", (t) => {
    function* seq() {
        yield 1;
        yield 2;
        throw new Error("Whoops");
    }

    t.deepEqual(
        toArray(replaceError(seq(), (_) => [3, 4])),
        [1, 2, 3, 4],
    );
});

test("replaceError will throw an error from the second sequence", (t) => {
    function* seq1() {
        yield 1;
        yield 2;
        throw new Error("Whoops");
    }

    function* seq2() {
        yield 3;
        throw new Error("Oops");
    }

    const seen: Array<any> = [];
    t.throws(() => {
        for (const item of replaceError(seq1(), () => seq2())) {
            seen.push(item);
        }
    });

    t.deepEqual(
        seen,
        [1, 2, 3],
    );
});

test("replaceError iterator closing early", (t) => {
    let closed = 0;
    function* seq() {
        try {
            yield 1;
            yield 2;
        } finally {
            closed += 1;
        }
        closed -= 1;
        throw new Error("Foo");
    }

    const data = new CountClosing([1, 2, 3]);

    const s = iterator(replaceError(seq(), (_) => data));
    s.next();
    s.return!();
    t.is(closed, 1);

    const s2 = iterator(replaceError(seq(), (_) => data));
    s2.next();
    s2.next();
    s2.next();
    s2.return!();
    t.is(closed, 1);
    t.is(data.closed, 1);
});
