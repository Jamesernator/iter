import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";
import iterableGenerator from "./iterableGenerator.js";

export const tests = {
    "iterableGenerator returns an object that can be iterated"() {
        function* gen() {
            yield 1;
            yield 2;
            yield 3;
        }

        const iterableGen = iterableGenerator(gen);

        assert.is("function", typeof iterableGen);

        const iterable = iterableGen();

        assert.is(typeof iterable[Symbol.iterator], "function");

        assert.deepEqual( toArray(iterable), [1, 2, 3]);
    },

    "iterableGenerator function returns an object that can be iterated many times"() {
        let count = 0;
        function* gen() {
            yield 1;
            yield 2;
            yield 3;
            count += 1;
        }

        const iterableGen = iterableGenerator(gen);
        const iterable = iterableGen();

        assert.is(0, count);
        assert.deepEqual([1, 2, 3], toArray(iterable));

        assert.is(1, count);
        assert.deepEqual([1, 2, 3], toArray(iterable));

        assert.is(2, count);
    },

    "iterableGenerator forwards arguments to generator function"() {
        function* gen(start: number, end: number) {
            for (let i = start; i < end; i += 1) {
                yield i;
            }
        }

        const iterableGen = iterableGenerator(gen);
        const iterable = iterableGen(10, 15);

        assert.deepEqual([10, 11, 12, 13, 14], toArray(iterable));

        const iterable2 = iterableGen(8, 12);

        assert.deepEqual([8, 9, 10, 11], toArray(iterable2));
    },
};
