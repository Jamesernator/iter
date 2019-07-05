import { AsyncOrSyncIterable } from "../../AsyncOrSyncIterable.js";
import iterator from "../iterator.js";

export default class CountClosing<T> implements AsyncIterableIterator<T> {
    private _closed: number = 0;
    private readonly _iterator: AsyncIterableIterator<T>;
    private readonly _throwError: boolean;

    constructor(iterable: AsyncOrSyncIterable<T>, throwError: boolean = false) {
        this._iterator = iterator(iterable);
        this._throwError = throwError;
    }

    get closed() {
        return this._closed;
    }

    async next() {
        return await this._iterator.next();
    }

    async return() {
        if (this._throwError) {
            throw new Error("[CountClosing] Iterator closing error");
        }
        this._closed += 1;
        return { done: true, value: undefined as unknown as T };
    }


    [Symbol.asyncIterator]() {
        return this;
    }
}

