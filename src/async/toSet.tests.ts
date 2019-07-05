import test from "ava";
import toSet from "./toSet.js";

test("set returns a set from a given sequence", async (t) => {
    async function* data() {
        yield 1;
        yield 2;
        yield 3;
        yield 3;
    }

    const s = await toSet(data());
    t.true(s.has(1));
    t.true(s.has(2));
    t.true(s.has(3));
    t.true(s instanceof Set);
    t.is(s.size, 3);
});
