import iterator from "../iterator.js";

export default class CountClosing<T> implements Generator<T, void> {
    #closed: number = 0;
    readonly #iterator: Generator<T, void>;
    readonly #throwError: boolean;

    constructor(iterable: Iterable<T>, throwError: boolean = false) {
        this.#iterator = iterator(iterable);
        this.#throwError = throwError;
    }

    get closed(): number {
        return this.#closed;
    }

    next(): IteratorResult<T> {
        return this.#iterator.next();
    }

    return(): IteratorResult<T> {
        if (this.#throwError) {
            throw new Error("[CountClosing] Iterator closing error");
        }
        this.#closed += 1;
        return { done: true as const, value: undefined };
    }

    throw(err: any): IteratorResult<T> {
        return this.#iterator.throw(err);
    }

    [Symbol.iterator](): Generator<T, void> {
        return this;
    }
}

