### `groupBy`

###### sync

```ts
interface MapLike<Key, Value> {
    get(key: Key): Value | undefined
    set(key: Key, value: Value): void
    has(key: Key): any
}

function groupBy<T>(
    iterable: Iterable<T>,
): Map<T, Array<T>>

function groupBy<T, Key>(
    iterable: Iterable<T>,
    keyFunc: (item: T, index: number) => Key,
): Map<Key, Array<T>>

function groupBy<T>(
    iterable: Iterable<T>,
    mapLike: MapLike<T, Array<T>>,
): MapLike<T, Array<T>>

function groupBy<T, Key>(
    iterable: Iterable<T>,
    mapLike: MapLike<Key, Array<T>>,
    keyFunc: (item: T, index: number) => Key,
): MapLike<Key, Array<T>>
```

###### async

```ts
interface MapLike<Key, Value> {
    get(key: Key): Value | undefined
    set(key: Key, value: Value): void
    has(key: Key): any
}

function groupBy<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): Promise<Map<T, Array<T>>>

function groupBy<T, Key>(
    asyncIterable: AsyncOrSyncIterable<T>,
    keyFunc: (item: T, index: number) => Key | Promise<Key>,
): Promise<Map<Key, Array<T>>>

function groupBy<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    mapLike: MapLike<T, Array<T>>,
): Promise<MapLike<T, Array<T>>>

function groupBy<T, Key>(
    asyncIterable: AsyncOrSyncIterable<T>,
    mapLike: MapLike<Key, Array<T>>,
    keyFunc: (item: T, index: number) => Key | Promise<Key>,
): Promise<MapLike<Key, Array<T>>>
```

The `groupBy` function groups items from the asyncIterable into a map that has keys which are returned from passing each item in the iterable
to the key function.

Optionally an object which has the methods `.set(key, value)`/`.has(key)`/`.get(key)` can be supplied instead in which case it will be used instead
of the builtin `Map` type.

```js
import groupBy from '@jx/iter/sync/groupBy.mjs'

groupBy([1,2,3,4,5,6,7], x => x % 2 === 0 ? 'even' : 'odd')
// Map { 'even' => [2,4,6], 'odd' => [1,3,5,7] }

class ObjectMap {
    constructor() {
        this.object = Object.create(null)
    }

    get(key) {
        return this.object[key]
    }

    set(key, value) {
        this.object[key] = value
    }

    has(key) {
        return key in this.object
    }
}

groupBy([1,2,3,4,5,6], new ObjectMap(), x => x % 2 === 0 ? 'even' : 'odd')
// ObjectMap { object: { 'odd': [1,3,5], 'even': [2,4,6] }}
```
