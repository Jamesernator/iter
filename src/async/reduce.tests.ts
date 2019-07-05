import test from "ava";
import reduce from "./reduce.js";
import CountClosing from "./helpers/CountClosing.js";

test("reduce without initial value", async (t) => {
    const target = ["Cat", "Hat", "Bat"];
    t.is(
        await reduce(target, (acc, item) => acc + item.repeat(2)),
        "CatHatHatBatBat",
    );
    t.is(
        await reduce(target, (acc, item, idx) => acc + item.repeat(idx)),
        "CatHatBatBat",
    );
});

test("reduce without initial value throws on empty sequence", async (t) => {
    const target: Array<number> = [];
    try {
        await reduce(target, (x, y) => x + y);
        t.fail("reduce didn't throw");
    } catch (_) {
        t.pass();
    }
});

test("reduce with initial value", async (t) => {
    const target = ["Cat", "Hat", "Bat"];
    t.is(
        await reduce(target, "Tat", (acc, item) => acc + item),
        "TatCatHatBat",
    );
    t.is(
        await reduce(target, "Tat", (acc, item, idx) => acc + item.repeat(idx)),
        "TatHatBatBat",
    );
});

test("reduce with initial value does not throw on empty sequence", async (t) => {
    const target: Array<string> = [];
    try {
        await reduce(target, "", (x, y) => x + y);
        t.pass();
    } catch (_) {
        t.fail("reduce threw error on empty sequence with initial value");
    }
});

test("reduce closing on iteratee error", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    await t.throwsAsync(() => {
        return reduce(data, () => {
            throw new Error("Error");
        });
    });
    t.is(data.closed, 1);
});
