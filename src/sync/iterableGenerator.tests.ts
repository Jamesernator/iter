import test from "ava";
import iterableGenerator from "./iterableGenerator.js";
import toArray from "./toArray.js";

test(
    "iterableGenerator returns an object that can be iterated",
    async (t) => {
        async function* gen() {
            yield 1;
            yield 2;
            yield 3;
        }

        const iterableGen = iterableGenerator(gen);

        t.is("function", typeof iterableGen);

        const iterable = iterableGen();

        t.is(typeof iterable[Symbol.asyncIterator], "function");

        t.deepEqual(await toArray(iterable), [1, 2, 3]);
    },
);

test(
    "iterableGenerator function returns an object that can be iterated many times",
    async (t) => {
        let count = 0;
        async function* gen() {
            yield 1;
            yield 2;
            yield 3;
            count += 1;
        }

        const iterableGen = iterableGenerator(gen);
        const iterable = iterableGen();

        t.is(0, count);
        t.deepEqual([1, 2, 3], await toArray(iterable));

        t.is(1, count);
        t.deepEqual([1, 2, 3], await toArray(iterable));

        t.is(2, count);
    },
);

test(


    "iterableGenerator forwards arguments to generator function",
    async (t) => {
        async function* gen(start: number, end: number) {
            for (let i = start; i < end; i += 1) {
                yield i;
            }
        }

        const iterableGen = iterableGenerator(gen);
        const iterable = iterableGen(10, 15);

        t.deepEqual([10, 11, 12, 13, 14], await toArray(iterable));

        const iterable2 = iterableGen(8, 12);

        t.deepEqual([8, 9, 10, 11], await toArray(iterable2));
    },
);
