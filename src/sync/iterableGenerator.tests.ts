import test from "ava";
import toArray from "./toArray.js";
import iterableGenerator from "./iterableGenerator.js";

test("iterableGenerator returns an object that be iterated", (t) => {
    const gen = function* () {
        yield 1;
        yield 2;
        yield 3;
    };

    const iterableGen = iterableGenerator(gen);

    t.is("function", typeof iterableGen);

    const iterable = iterableGen();

    t.true(typeof iterable[Symbol.iterator] === "function");

    t.deepEqual(
        toArray(iterable),
        [1, 2, 3],
    );
});

test("iterableGenerator function returns an object that can be reiterated", (t) => {
    let count = 0;
    const gen = function* () {
        count += 1;
        yield 1;
        yield 2;
        yield 3;
    };

    const iterableGen = iterableGenerator(gen);
    const iterable = iterableGen();

    t.deepEqual(
        toArray(iterable),
        [1, 2, 3],
    );

    t.is(count, 1);

    t.deepEqual(
        toArray(iterable),
        [1, 2, 3],
    );

    t.is(count, 2);
});

test("iterableGenerator has arguments forwarded to created iterator", (t) => {
    const gen = function* (start: number) {
        for (let i = start; i < start + 3; i += 1) {
            yield i;
        }
    };

    const iterableGen = iterableGenerator(gen);
    const iterable = iterableGen(11);

    t.deepEqual(
        toArray(iterable),
        [11, 12, 13],
    );

    // Iterable can be re-used with the same arguments

    t.deepEqual(
        toArray(iterable),
        [11, 12, 13],
    );

    const iterable2 = iterableGen(14);

    t.deepEqual(
        toArray(iterable2),
        [14, 15, 16],
    );
});
