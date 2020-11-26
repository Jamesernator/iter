import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

function delay<T>(time: number, value: T): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(resolve, time, value);
    });
}

const debounceTrailing = iterableGenerator(
    async function* debounceTrailing<T>(
        iterable: AsyncOrSyncIterable<T>,
        time: number,
    ): AsyncGenerator<T> {
        const it = iterator(iterable);

        const next = () => Promise.resolve(it.next())
            .then((iteratorResult) => ({
                type: "iteratorResult" as const,
                iteratorResult,
            }));

        try {
            const res = await it.next();
            if (res.done) {
                return;
            }
            let nextResult = next();
            while (true) {
                type NextResult =
                    { type: "delay" }
                    | { type: "iteratorResult", iteratorResult: IteratorResult<T> };

                const val: NextResult = await Promise.race([
                    nextResult,
                    delay(time, { type: "delay" as const }),
                ]);
                let previousValue = res.value;
                if (val.type === "delay") {
                    yield previousValue;
                    const result = await nextResult;
                    if (result.iteratorResult.done) {
                        return;
                    }
                    nextResult = next();
                    previousValue = result.iteratorResult.value;
                } else if (val.iteratorResult.done) {
                    return;
                } else {
                    previousValue = val.iteratorResult.value;
                    nextResult = next();
                }
            }
        } finally {
            await it.return();
        }
    },
);

export { debounceTrailing as default };
