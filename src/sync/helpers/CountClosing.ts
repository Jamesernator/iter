import iterator from "../iterator.js";

export default class CountClosing<T> implements IterableIterator<T> {
    private _closed: number = 0;
    private readonly _iterator: IterableIterator<T>;
    private readonly _throwError: boolean;

    constructor(iterable: Iterable<T>, throwError: boolean = false) {
        this._iterator = iterator(iterable);
        this._throwError = throwError;
    }

    get closed() {
        return this._closed;
    }

    next() {
        return this._iterator.next();
    }

    return() {
        if (this._throwError) {
            throw new Error("[CountClosing] Iterator closing error");
        }
        this._closed += 1;
        return { done: true as const, value: undefined };
    }

    [Symbol.iterator]() {
        return this;
    }
}

