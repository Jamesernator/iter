type AsyncOrSyncIterable = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable;
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

const takeUntil = iterableGenerator(
    async function* takeUntil<T>(
        iterable: AsyncOrSyncIterable<T>,
        createTimeout: () => any,
    ) {
        const promise = Promise.resolve(createTimeout());

        const terminated = promise.then((value) => ({
            type: "interrupt" as const,
            value,
        }));
        const it = iterator(iterable);
        try {
            while (true) {
                const nextValue = Promise.resolve(it.next()).then((value) => ({
                    type: "nextValue" as const,
                    value,
                }));
                const nextItem = await Promise.race([nextValue, terminated]);
                if (nextItem.type === "interrupt") {
                    return;
                }
                const { done, value: iteratorValue } = nextItem.value;
                if (done) {
                    return;
                }
                yield iteratorValue;
            }
        } finally {
            await it.return!();
        }
    },
);

export { takeUntil as default };
