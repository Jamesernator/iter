import test from "ava";
import toArray from "./toArray.js";
import map from "./map.js";
import CountClosing from "./helpers/CountClosing.js";

test("map basic functionality", (t) => {
    const data = [1, 2, 3];

    t.deepEqual(
        toArray(map(data, (x) => x**2)),
        [1, 4, 9],
    );
});

test("map iteratee receives second argument", (t) => {
    const data = [11, 22, 33];

    t.deepEqual(
        toArray(map(data, (x, i) => [x, i])),
        [[11, 0], [22, 1], [33, 2]],
    );
});

test("map iteratee receives no additional arguments", (t) => {
    const data = [11, 22, 33];

    toArray(map(data, (_1, _2, ...rest) => t.is(0, rest.length)));
});


test("iterator closing on early map close", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = map(data, (x) => x**2)[Symbol.Iterator]();

    seq.next();
    seq.return!();
    t.is(data.closed, 1);
});

test("iterator closing on error in iteratee", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    t.throws(() => toArray(
        map(data, (value, i) => {
            if (i === 2) {
                throw new Error("Error");
            }
            return value;
        }),
    ));
    t.is(data.closed, 1);
});
