import test from "ava";
import toArray from "./toArray.js";
import reject from "./reject.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

test("reject basic functionality", (t) => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    t.deepEqual(
        toArray(reject(data, (x) => x % 3 === 0)),
        [1, 2, 4, 5, 7, 8, 10],
    );
});

test("reject receives correct arguments", (t) => {
    const data = [4, 3, 2, 1];

    t.deepEqual(
        toArray(reject(data, (_, idx) => idx % 2 === 0)),
        [3, 1],
    );

    toArray(reject(data, (_, __, ...rest) => t.deepEqual(rest, [])));
});

test("reject iterator closing on early close", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(reject(data, (x) => x % 2 === 0));

    seq.next();
    seq.return!();
    t.is(data.closed, 1);
});

test("reject iterator closing on predicate error", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(reject(data, (_) => {
        throw new Error("Error");
    }));

    t.throws(() => seq.next());
    t.is(data.closed, 1);
});
