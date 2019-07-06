import iterator from "../iterator.js";

export default class CountClosing<T> implements Generator<T, void> {
    private _closed: number = 0;
    private readonly _iterator: Generator<T, void>;
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

    throw(err: any) {
        return this._iterator.throw(err);
    }

    [Symbol.iterator](): Generator<T, void> {
        return this;
    }
}

