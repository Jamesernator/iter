import * as assert from "../lib/assert.js";
import toArray from "./toArray.js";
import iterableGenerator from "./iterableGenerator.js";

export const tests = {
    async "iterableGenerator returns an object that can be iterated"() {
        async function* gen() {
            yield 1;
            yield 2;
            yield 3;
        }

        const iterableGen = iterableGenerator(gen);

        assert.is("function", typeof iterableGen);

        const iterable = iterableGen();

        assert.is(typeof iterable[Symbol.asyncIterator], "function");

        assert.deepEqual(await toArray(iterable), [1, 2, 3]);
    },

    async "iterableGenerator function returns an object that can be iterated many times"() {
        let count = 0;
        async function* gen() {
            yield 1;
            yield 2;
            yield 3;
            count += 1;
        }

        const iterableGen = iterableGenerator(gen);
        const iterable = iterableGen();

        assert.is(0, count);
        assert.deepEqual([1, 2, 3], await toArray(iterable));

        assert.is(1, count);
        assert.deepEqual([1, 2, 3], await toArray(iterable));

        assert.is(2, count);
    },

    async "iterableGenerator forwards arguments to generator function"() {
        async function* gen(start: number, end: number) {
            for (let i = start; i < end; i += 1) {
                yield i;
            }
        }

        const iterableGen = iterableGenerator(gen);
        const iterable = iterableGen(10, 15);

        assert.deepEqual([10, 11, 12, 13, 14], await toArray(iterable));

        const iterable2 = iterableGen(8, 12);

        assert.deepEqual([8, 9, 10, 11], await toArray(iterable2));
    },
};
