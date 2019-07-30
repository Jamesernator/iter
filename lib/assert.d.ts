export declare function is<T>(a: T, b: T, message?: string): void;
export declare function deepEqual<T>(a: T, b: T, message?: string): void;
export declare function throws(func: ((...args: Array<any>) => any), message?: string): void;
export declare function throwsAsync(func: ((...args: Array<any>) => any), message?: string): Promise<void>;
export declare function isTrue(value: boolean): void;
export declare function isFalse(value: boolean, message?: string): void;
export declare function instanceOf(value: any, type: any, message?: string): void;
