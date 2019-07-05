

class NotSameValueError<T> extends Error {
    private _value1: T;
    private _value2: T;

    constructor(message: string, value1: T, value2: T) {
        super(message)
        this._value1 = value1
        this._value2 = value2
    }

    get value1() {
        return this._value1
    }

    get value2() {
        return this._value2
    }
}

export function is<T>(a: T, b: T, message?: string) {
    if (!Object.is(a, b)) {
        throw new NotSameValueError(message || `Values are not the same`, a, b)
    }
}

class NotDeepEqualError<T> extends Error {
    private _value1: T;
    private _value2: T;

    constructor(message: string, value1: T, value2: T) {
        super(message)
        this._value1 = value1
        this._value2 = value2
    }

    get value1() {
        return this._value1
    }

    get value2() {
        return this._value2
    }
}

export function deepEqual<T>(a: T, b: T, message?: string) {
    const seen = new Set()

    function deepEqualRecursive(a: T, b: T): boolean {
        if (seen.has(a)) {
            throw new TypeError("Circular objects not supported")
        }
        if (a === undefined) {
            return b === undefined;
        } else if (a === null) {
            return b === null;
        } else if (typeof a === 'number'
        || typeof a === 'string'
        || typeof a === 'boolean'
        || typeof a === 'bigint'
        || typeof a === 'symbol') {
            return Object.is(a, b)
        } else if (Array.isArray(a)) {
            seen.add(a)
            return Array.isArray(b)
                && a.length === b.length
                && a.every((item, index) => item === b[index])
        } else if (Object.getPrototypeOf(a) === null
        || Object.getPrototypeOf(a) === Object.prototype) {
            seen.add(a)
            return typeof b === 'object'
                && Object.keys(a).length === Object.keys(b).length
                && Object.entries(a).every(([item, index]) => item === (b as any)[index])
        }
        throw new TypeError("Can't use deepEqual on value")
    }

    if (!deepEqualRecursive(a, b)) {
        throw new NotDeepEqualError(message || `Values are not deep equal`, a, b)
    }
}


class NotThrowsError extends Error {
    private _function: (...args: any[]) => any;

    constructor(message: string, func: (...args: any[]) => any) {
        super(message)
        this._function = func
    }

    get function() {
        return this._function
    }
}

export function throws(func: ((...args: any[]) => any), message?: string) {
    try {
        func()
        throw new NotThrowsError(message || `Function didn't throw`, func)
    } catch {
        // Did throw
    }
}

export async function throwsAsync(func: ((...args: any[]) => any), message?: string) {
    try {
        await func()
        throw new NotThrowsError(message || `Function didn't throw`, func)
    } catch {
        // Did throw
    }
}

class NotTrueError extends Error {}

export function isTrue(value: boolean) {
    if (!value) {
        throw new NotTrueError(`Expected value to be true`)
    }
}

class NotFalseError extends Error {}

export function isFalse(value: boolean, message?: string) {
    if (value) {
        throw new NotFalseError(message || `Expected value to be false`)
    }
}
