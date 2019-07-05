import test from "ava";
import sampleOne from "./sampleOne.js";

test("sampleOne with no additional argument returns a number", (t) => {
    const data = [1, 2, 3, 4, 5, 6];
    const choice = sampleOne(data);
    t.is(typeof choice, "number");
    t.true(data.includes(choice));
});

test("sampleOne throws given an empty sequence", (t) => {
    const data: Array<number> = [];
    t.throws(() => sampleOne(data));
});
