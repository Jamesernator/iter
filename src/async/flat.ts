import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";

const flat = iterableGenerator(
    async function* flat<T>(iterable: AsyncOrSyncIterable<AsyncOrSyncIterable<T>>) {
        for await (const item of iterable) {
            yield* item;
        }
    },
);

export { flat as default };
