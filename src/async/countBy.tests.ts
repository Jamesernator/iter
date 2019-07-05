import test from "ava";
import toArray from "../sync/toArray.js";
import countBy from "./countBy.js";
import CountClosing from "./helpers/CountClosing.js";

test("countBy no arguments", async (t) => {
    const data = [1, 2, 3, 4, 1, 2, 3, 3, 3];
    t.deepEqual(
        toArray(await countBy(data)).sort((a, b) => a[0] - b[0]),
        [[1, 2], [2, 2], [3, 4], [4, 1]],
    );
});

test("countBy with key function", async (t) => {
    const data = [1, 2, 3, 4, 5, 4, 3, 2, 5, 2, 3, 1, 6, 2, 2, 23, 3];
    const evens = data.filter((item) => item % 2 === 0);
    const odds = data.filter((item) => item % 2 === 1);

    const counts = await countBy(
        data,
        (item) => item % 2 === 0 ? "even" : "odd",
    );

    t.is(
        counts.get("even"),
        evens.length,
    );

    t.is(
        counts.get("odd"),
        odds.length,
    );
});

test("iterator closing with toKey function", async (t) => {
    const data = new CountClosing([1, 2, 3, "foo", 12, 13]);
    await t.throwsAsync(() => countBy(data, (value, i) => {
        if (i === 3) {
            throw new Error("Test");
        }
        return value;
    }));

    t.is(data.closed, 1);
});
