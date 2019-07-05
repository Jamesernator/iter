import test from "ava";
import sampleN from "./sampleN.js";

test("sampleN with single numeric argument returns a sampling of size n", (t) => {
    const data = [1, 2, 3, 4, 5];
    const choice = sampleN(data, 3);
    t.true(Array.isArray(choice));
    t.is(choice.length, 3);
    for (const element of choice) {
        t.true(data.includes(element));
    }
    t.true(choice.length === new Set(choice).size);
});

test("sampleN with a single numeric arguments throws an error on too short sequence", (t) => {
    const data = [1, 2, 3];
    t.throws(() => sampleN(data, 5));
});

test("sampleN with numeric argument and boolean true doesn't throw", (t) => {
    const data = [1, 2, 3];
    t.deepEqual([1, 2, 3], sampleN(data, 10, true));
});
