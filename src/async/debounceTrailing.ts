import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

function delay<T>(time: number, value: T): Promise<T> {
    /* global setTimeout */
    return new Promise((resolve) => setTimeout(resolve, time, value));
}

const debounceTrailing = iterableGenerator(
    async function* debounceTrailing<T>(
        iterable: AsyncOrSyncIterable<T>,
        time: number,
    ) {
        const it = iterator(iterable);

        const next = () => Promise.resolve(it.next())
            .then((iteratorResult) => ({
                type: "iteratorResult" as const,
                iteratorResult,
            }));

        try {
            let { value: previousValue, done } = await it.next();
            if (done) {
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
            await it.return!();
        }
    },
);

export { debounceTrailing as default };
