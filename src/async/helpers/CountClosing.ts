import iterator from "../iterator.js";

type AsyncOrSyncIterable<T> = import("../../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default class CountClosing<T> implements AsyncGenerator<T> {
    private _closed: number = 0;
    private readonly _iterator: AsyncGenerator<T>;
    private readonly _throwError: boolean;

    constructor(iterable: AsyncOrSyncIterable<T>, throwError: boolean = false) {
        this._iterator = iterator(iterable);
        this._throwError = throwError;
    }

    get closed() {
        return this._closed;
    }

    async next(): Promise<IteratorResult<T, void>> {
        const iteratorResult = await this._iterator.next();
        return iteratorResult;
    }

    async return() {
        if (this._throwError) {
            throw new Error("[CountClosing] Iterator closing error");
        }
        this._closed += 1;
        return { done: true as const, value: undefined };
    }

    async throw(err: any) {
        return this._iterator.throw(err);
    }

    [Symbol.asyncIterator](): AsyncGenerator<T, void> {
        return this;
    }
}

