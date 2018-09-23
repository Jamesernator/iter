### `unique`

###### sync

```ts
interface SetLike<Value> {
    add(value: Value): void
    has(value: Value): any
}

function unique<T>(
    iterable: Iterable<T>,
): Iterable<T>

function unique<T>(
    iterable: Iterable<T>,
    set: SetLike<T>,
): Iterable<T>
```

###### async

```ts
interface SetLike<Value> {
    add(value: Value): void
    has(value: Value): any
}

function unique<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): AsyncIterable<T>

function unique<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    set: SetLike<T>,
): AsyncIterable<T>

```

The `unique` function returns an iterable that emits items
only the first time it sees a particular item. Unlike `toSet` this
function is lazy and constructs the set only as items are requested.

Optionally a custom set can be passed as the second argument to be used
instead of the builtin `Set` object.

```js
import unique from '@jx/iter/sync/unique.mjs'

Array.from(unique([1,2,3,1,2,4]))
// [1,2,3,4]

class PointSet extends Set {
    add(point) {
        return super.add(`${ point.x }, ${ point.y }`)
    }

    has(point) {
        return super.has(`${ point.x }, ${ point.y }`)
    }
}

const points = [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 1, y: 1 },
    { x: 3, y: 12 },
]

Array.from(unique(points, new PointSet()))
// [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 12 }]
```
