import test from "ava";
import toArray from "./toArray.js";
import map from "./map.js";
import CountClosing from "./helpers/CountClosing.js";

test("map basic functionality", async (t) => {
    const data = [1, 2, 3];

    t.deepEqual(
        await toArray(map(data, (x) => x**2)),
        [1, 4, 9],
    );
});

test("map iteratee receives second argument", async (t) => {
    const data = [11, 22, 33];

    t.deepEqual(
        await toArray(map(data, (x, i) => [x, i])),
        [[11, 0], [22, 1], [33, 2]],
    );
});

test("map iteratee receives no additional arguments", async (t) => {
    const data = [11, 22, 33];

    await toArray(map(data, (_1, _2, ...rest) => t.is(0, rest.length)));
});


test("iterator closing on early map close", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = map(data, (x) => x**2)[Symbol.asyncIterator]();

    await seq.next();
    await seq.return();
    t.is(data.closed, 1);
});

test("iterator closing on error in iteratee", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    await t.throwsAsync(() => toArray(
        map(data, (value, i) => {
            if (i === 2) {
                throw new Error("Error");
            }
            return value;
        }),
    ));
    t.is(data.closed, 1);
});
