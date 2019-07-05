import test from "ava";
import length from "./length.js";

const call = <R>(f: () => R) => f();

test("length returns the length of an iterable", (t) => {
    const a = [1, 2, 3, 4];
    const b = call(function* foo() {
        yield 1;
        yield 2;
    });
    const c = call(function* () {
        yield* [];
    });

    t.is( length(a), 4);
    t.is( length(b), 2);
    t.is( length(b), 0);
    t.is( length(c), 0);
});
