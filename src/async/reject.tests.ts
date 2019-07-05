import test from "ava";
import toArray from "./toArray.js";
import reject from "./reject.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./iterator.js";

test("reject basic functionality", async (t) => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    t.deepEqual(
        await toArray(reject(data, (x) => x % 3 === 0)),
        [1, 2, 4, 5, 7, 8, 10],
    );
});

test("reject receives correct arguments", async (t) => {
    const data = [4, 3, 2, 1];

    t.deepEqual(
        await toArray(reject(data, (_, idx) => idx % 2 === 0)),
        [3, 1],
    );

    await toArray(reject(data, (_, __, ...rest) => t.deepEqual(rest, [])));
});

test("reject iterator closing on early close", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(reject(data, (x) => x % 2 === 0));

    await seq.next();
    await seq.return!();
    t.is(data.closed, 1);
});

test("reject iterator closing on predicate error", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(reject(data, (_) => {
        throw new Error("Error");
    }));

    await t.throwsAsync(() => seq.next());
    t.is(data.closed, 1);
});
