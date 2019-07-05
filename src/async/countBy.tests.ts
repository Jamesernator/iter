import * as assert from "../lib/assert.js";
import countBy from "./countBy.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    async "countBy returns a map mapping items to counts"() {
        const data = [1, 2, 3, 4, 1, 2, 3, 3, 3];

        const result = await countBy(data);
        assert.instanceOf(result, Map);
        assert.is(result.get(1), 2);
        assert.is(result.get(2), 2);
        assert.is(result.get(3), 4);
        assert.is(result.get(4), 1);
    },

    async "countBy with custom key returns a key mapping keys to counts"() {
        const data = [1, 2, 3, 4, 5, 4, 3, 2, 5, 2, 3, 1, 6, 2, 2, 23, 3];

        const toEvenOddKey = (value: number) => value % 2 === 0 ? "even" : "odd";

        const counts = await countBy(data, toEvenOddKey);

        assert.is(counts.get("even"), data.filter((i) => i % 2 === 0).length);
        assert.is(counts.get("odd"), data.filter((i) => i % 2 === 1).length);
    },

    async "iterator closing with toKey function"() {
        const iter = new CountClosing([1, 2, 3, 4]);

        function toKey(value: number) {
            if (value === 3) {
                throw new Error("test");
            }
            return value;
        }

        await assert.throwsAsync(() => countBy(iter, toKey));
        assert.is(iter.closed, 1);
    },
};

/*
 * test("iterator closing with toKey function", async (t) => {
 * const data = new CountClosing([1, 2, 3, "foo", 12, 13]);
 * await t.throwsAsync(() => countBy(data, (value, i) => {
 * if (i === 3) {
 * throw new Error("Test");
 * }
 * return value;
 * }));
 *
 * t.is(data.closed, 1);
 * });
 */
