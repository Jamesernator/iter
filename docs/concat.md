
### `concat`

###### sync

```ts
function concat<T>(
    iterable: Iterable<T>,
    ...others: Array<Iterable<T>>,
): Iterable<T>

function concat(iterable, ...others)
```

###### async

```ts
function concat<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    ...others: Array<AsyncOrSyncIterable<T>>,
): AsyncIterable<T>

function concat(asyncIterable, ...others)
```

The `concat` function takes 1 or more iterables and returns a new iterable that when iterated will emit all items from the first iterable, then all items from the second iterable, etc.

```js
import concat from '@jx/iter/sync/concat.mjs'

const newSeq = concat([1,2,3], [4,5,6])
Array.from(newSeq) // [1,2,3,4,5,6]
```
