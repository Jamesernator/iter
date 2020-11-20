
export interface MapLike<Key, Value> {
    get(key: Key): Value | undefined;
    set(key: Key, value: Value): void;
    has(key: Key): any;
}
