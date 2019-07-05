
// eslint-disable-next-line import/prefer-default-export
export interface MapLike<Key, Value> {
    get(key: Key): Value | undefined;
    set(key: Key, value: Value): void;
    has(key: Key): any;
}
