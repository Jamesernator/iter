import test from "ava";
import countBy from "./countBy.js";
import CountClosing from "./helpers/CountClosing.js";
import asyncIterableOf from "./helpers/asyncIterableOf.js";

test(
    "countBy returns a map mapping items to counts",
    async (t) => {
        const data = asyncIterableOf([1, 2, 3, 4, 1, 2, 3, 3, 3]);

        const result = await countBy(data);
        t.true(result instanceof Map);
        t.is(result.get(1), 2);
        t.is(result.get(2), 2);
        t.is(result.get(3), 4);
        t.is(result.get(4), 1);
    },
);


test(
    "countBy with custom key returns a key mapping keys to counts",
    async (t) => {
        const data = [1, 2, 3, 4, 5, 4, 3, 2, 5, 2, 3, 1, 6, 2, 2, 23, 3];

        const toEvenOddKey = (value: number) => value % 2 === 0 ? "even" : "odd";

        const counts = await countBy(asyncIterableOf(data), toEvenOddKey);

        t.is(counts.get("even"), data.filter((i) => i % 2 === 0).length);
        t.is(counts.get("odd"), data.filter((i) => i % 2 === 1).length);
    },
);

test(
    "iterator closing with toKey function",
    async (t) => {
        const iter = new CountClosing(asyncIterableOf([1, 2, 3, 4]));

        function toKey(value: number) {
            if (value === 3) {
                throw new Error("test");
            }
            return value;
        }

        await t.throwsAsync(() => countBy(iter, toKey));
        t.is(iter.closed, 1);
    },
);
