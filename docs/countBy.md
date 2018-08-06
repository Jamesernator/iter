### `countBy`

###### sync

```ts
interface MapLike<Key, Value> {
    get(key: Key): Value | undefined
    set(key: Key, value: Value): void
    has(key: Key): any
}

function countBy<T>(
    iterable: Iterable<T>,
): Map<T, number>

function countBy<T, Key>(
    iterable: Iterable<T>,
    keyFunc: (item: T, index: number) => Key,
): Map<Key, number>

function countBy<T>(
    iterable: Iterable<T>,
    mapLike: MapLike<T, number>,
): MapLike<T, number>

function countBy<T, Key>(
    iterable: Iterable<T>,
    mapLike: MapLike<Key, number>,
    keyFunc: (item: T, index: number) => Key,
): MapLike<Key, number>
```

###### async

```ts
interface MapLike<Key, Value> {
    get(key: Key): Value | undefined
    set(key: Key, value: Value): void
    has(key: Key): any
}

function countBy<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): Promise<Map<T, number>>

function countBy<T, Key>(
    asyncIterable: AsyncOrSyncIterable<T>,
    keyFunc: (item: T, index: number) => Key | Promise<Key>,
): Promise<Map<Key, number>>

function countBy<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    mapLike: MapLike<T, number>,
): Promise<MapLike<T, number>>

function countBy<T, Key>(
    asyncIterable: AsyncOrSyncIterable<T>,
    mapLike: MapLike<Key, number>,
    keyFunc: (item: T, index: number) => Key | Promise<Key>,
): Promise<MapLike<Key, number>>
```

The `countBy` counts the number of instances of each item in the iterable. If a keyFunction is passed it will use the return value of the keyFunction as the key for the Map instead. If a custom map is used it will instead use the custom map class.

```js
import countBy from '@jx/iter/sync/countBy.mjs'

countBy([1,2,3,1,2,9,4,1])
/*
Map {
    1 => 3,
    2 => 2,
    3 => 1,
    4 => 1,
    9 => 1,
}
*/

countBy([1,2,3,4,5], x => x % 2)
/*
Map {
    0 => 2,
    1 => 3,
}
*/

class NumberArrayMap {
    constructor() {
        this._map = new Map()
    }

    get(key) {
        return this._map.get(key.join(','))
    }

    set(key, value) {
        return this._map.set(key.join(','), value)
    }

    has(key) {
        return this._map.has(key.join(','))
    }
}

const data = [
    [1,2,3],
    [1,2,3],
    [1,2,5],
    [1,3,7],
    [2,3,4],
    [4,5,6],
]

countBy(data, new NumberArrayMap())
/*
NumberArrayMap {
    '1,2,3' => 2,
    '1,2,5' => 1,
    '1,3,7' => 1,
    '2,3,4' => 1,
    '4,5,6' => 1,
}
*/

countBy(data, new NumberArrayMap(), ([x, y, z]) => [x, y])
/*
NumberArrayMap {
    '1,2' => 3,
    '1,3' => 1,
    '2,3' => 1,
    '4,5' => 1,
}
*/
```
