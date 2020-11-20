import type { AsyncOrSyncIterable } from "../../lib/AsyncOrSyncIterable.js";
import iterator from "../iterator.js";

export default class CountClosing<T> implements AsyncGenerator<T> {
    #closed: number = 0;
    readonly #iterator: AsyncGenerator<T, void>;
    readonly #throwError: boolean;

    constructor(iterable: AsyncOrSyncIterable<T>, throwError: boolean = false) {
        this.#iterator = iterator(iterable);
        this.#throwError = throwError;
    }

    get closed(): number {
        return this.#closed;
    }

    async next(): Promise<IteratorResult<T, void>> {
        const iteratorResult = await this.#iterator.next();
        return iteratorResult;
    }

    async return(): Promise<IteratorResult<T, void>> {
        if (this.#throwError) {
            throw new Error("[CountClosing] Iterator closing error");
        }
        await this.#iterator.return();
        this.#closed += 1;
        return { done: true as const, value: undefined };
    }

    async throw(err: any): Promise<IteratorResult<T, void>> {
        return await this.#iterator.throw(err);
    }

    [Symbol.asyncIterator](): AsyncGenerator<T, void> {
        return this;
    }
}

