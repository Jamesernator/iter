import test from "ava";
import none from "./none.js";
import CountClosing from "./helpers/CountClosing.js";

test("none basic functionality", async (t) => {
    const isEven = (i: number) => i % 2 === 0;
    const a = [1, 3, 5, 7, 9];
    const b = [1, 2, 3, 4, 5];
    const c = [2, 4, 6, 8];

    t.true(await none(a, isEven));
    t.false(await none(b, isEven));
    t.false(await none(c, isEven));
});

test("none is vacuously true", async (t) => {
    const isEven = (i: number) => i % 2 === 0;

    t.true(await none([], isEven));
});

test("none defaults to identity for truthiness", async (t) => {
    t.true(await none([0, false, "", null, undefined]));
    t.false(await none([1]));
    t.false(await none([{}]));
    t.false(await none(["foo"]));
});

test("none iterator closing on early find", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    await none(data, (x) => x === 2);
    t.is(data.closed, 1);
});

test("none iterator closing on predicate error", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    await t.throwsAsync(() => none(data, () => {
        throw new Error("Error");
    }));
    t.is(data.closed, 1);
});
