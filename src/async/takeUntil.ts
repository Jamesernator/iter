import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import type { Awaitable } from "../lib/Awaitable.js";
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

const takeUntil = iterableGenerator(
    async function* takeUntil<T>(
        iterable: AsyncOrSyncIterable<T>,
        createTimeout: () => Awaitable<any>,
    ): AsyncGenerator<T> {
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
                const res = nextItem.value;
                if (res.done) {
                    return;
                }
                yield res.value;
            }
        } finally {
            await it.return();
        }
    },
);

export { takeUntil as default };
