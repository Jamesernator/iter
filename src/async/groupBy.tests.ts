import * as assert from "../lib/assert.js";
import groupBy from "./groupBy.js";
import CountClosing from "./helpers/CountClosing.js";

export const tests = {
    async "groupBy returns a map of arrays indexed by each key"() {
        const data = [1, 2, 3, 4, 5, 6];

        const groups = await groupBy(data, (i) => i % 2 === 0 ? "even" : "odd");

        assert.deepEqual(groups.get("even"), [2, 4, 6]);
        assert.deepEqual(groups.get("odd"), [1, 3, 5]);
    },

    async "groupBy defaults to identity"() {
        const data = [1, 2, 3, 1, 1, 2];

        const groups = await groupBy(data);

        assert.deepEqual(groups.get(1), [1, 1, 1]);
        assert.deepEqual(groups.get(2), [2, 2]);
        assert.deepEqual(groups.get(3), [3]);
    },

    async "groupBy iterator closing on toKey error"() {
        const iter = new CountClosing([1, 2, 3, 4, 5]);

        await assert.throwsAsync(() => groupBy(iter, (i) => {
            if (i === 3) {
                throw new Error("Test");
            }
        }));

        assert.is(iter.closed, 1);
    },
};
