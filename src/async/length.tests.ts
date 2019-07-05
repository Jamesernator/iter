import test from "ava";
import length from "./length.js";

const call = <R>(f: () => R) => f();

test("length returns the length of an iterable", async (t) => {
    const a = [1, 2, 3, 4];
    const b = call(async function* foo() {
        yield 1;
        yield 2;
    });
    const c = call(async function* () {
        yield* [];
    });

    t.is(await length(a), 4);
    t.is(await length(b), 2);
    t.is(await length(b), 0);
    t.is(await length(c), 0);
});
