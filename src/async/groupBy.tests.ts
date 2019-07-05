import test from "ava";
import groupBy from "./groupBy.js";
import CountClosing from "./helpers/CountClosing.js";

test("groupBy basic functionality", async (t) => {
    const groups = await groupBy([1, 2, 3, 4, 5, 6], (x) => x % 2 === 0 ? "even": "odd");
    t.deepEqual(
        groups.get("even"),
        [2, 4, 6],
    );

    t.deepEqual(
        groups.get("odd"),
        [1, 3, 5],
    );
});

test("groupBy defaults to identity", async (t) => {
    const groups = await groupBy([1, 2, 1, 2, 3, 4, 4]);
    t.deepEqual(
        groups.get(1),
        [1, 1],
    );

    t.deepEqual(
        groups.get(3),
        [3],
    );
});

test("iterator closing if iteratee throws an error", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    await t.throwsAsync(() => groupBy(data, () => {
        throw new Error("Error");
    }));
    t.is(data.closed, 1);
});
