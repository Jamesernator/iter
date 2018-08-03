### `groupBy`

###### sync

```ts
interface GroupMap<Key, Value> {
    get(key: Key): Value,
    set(key: Key, value: Value): any,
    has(key: Key): any,
}

function groupBy<T>(
    iterable: Iterable<T>
): Map<T, Array<T>>

function groupBy<T, Key>(
    iterable: Iterable<T>,
    keyFunction: (item: T, index: number) => Key,
): Map<Key, Array<T>>

function groupBy<T>(
    iterable: Iterable<T>,
    customMap: CountMap<T, number>,
): GroupMap<T, Array<T>>

function groupBy<T, Key>(
    iterable: Iterable<T>,
    customMap: CountMap<Key, number>,
    keyFunction: (item: T, index: number) => Key,
): GroupMap<Key, Array<T>>

function groupBy(iterable)
function groupBy(iterable, keyFunction)
function groupBy(iterable, customMap)
function groupBy(iterable, customMap = new Map(), keyFunction = x => x)
```

###### async

```ts
interface GroupMap<Key, Value> {
    get(key: Key): Value,
    set(key: Key, value: Value): any,
    has(key: Key): any,
}

function groupBy<T>(
    asyncIterable: AsyncOrSyncIterable<T>
): Promise< Map<T, Array<T>> >

function groupBy<T, Key>(
    asyncIterable: Iterable<T>,
    keyFunction: (item: T, index: number) => Key,
): Promise< Map<Key, Array<T>> >

function groupBy<T>(
    asyncIterable: Iterable<T>,
    customMap: CountMap<T, number>,
): Promise< GroupMap<T, Array<T>> >

function groupBy<T, Key>(
    asyncIterable: Iterable<T>,
    customMap: CountMap<Key, number>,
    keyFunction: (item: T, index: number) => Key,
): Promise< GroupMap<Key, Array<T>> >

function groupBy(asyncIterable)
function groupBy(asyncIterable, keyFunction)
function groupBy(asyncIterable, customMap)
function groupBy(asyncIterable, customMap = new Map(), keyFunction = x => x)
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
