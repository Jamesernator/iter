import test from "ava";
import forEach from "./forEach.js";
import CountClosing from "./helpers/CountClosing.js";

test("each basic functionality", async (t) => {
    const seq = (async function* () {
        yield 1;
        yield 2;
        yield 3;
        return "complete";
    }());
    const result: Array<number> = [];
    await forEach(seq, (item) => result.push(item as number));
    t.deepEqual(result, [1, 2, 3]);
});


test("iterator closing on iteratee error", async (t) => {
    const out: Array<number> = [];
    const data = new CountClosing([1, 2, 3, 4]);
    await t.throwsAsync(() => forEach(data, (value, i) => {
        if (i === 2) {
            throw new Error("Error");
        }
        out.push(value);
    }));
    t.is(data.closed, 1);
    t.deepEqual(out, [1, 2]);
});
