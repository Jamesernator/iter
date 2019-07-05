import test from "ava";
import forEach from "./forEach.js";
import CountClosing from "./helpers/CountClosing.js";

test("each basic functionality", (t) => {
    const seq = ( function* () {
        yield 1;
        yield 2;
        yield 3;
        return "complete";
    }());
    const result: Array<number> = [];
    forEach(seq, (item) => result.push(item as number));
    t.deepEqual(result, [1, 2, 3]);
});


test("iterator closing on iteratee error", (t) => {
    const out: Array<number> = [];
    const data = new CountClosing([1, 2, 3, 4]);
    t.throws(() => forEach(data, (value, i) => {
        if (i === 2) {
            throw new Error("Error");
        }
        out.push(value);
    }));
    t.is(data.closed, 1);
    t.deepEqual(out, [1, 2]);
});
