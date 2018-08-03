### `last`

###### sync

```ts
function last<T>(
    iterable: Iterable<T>,
): T

function last<T>(
    iterable: Iterable<T>,
    count: number,
): Array<T>

function last<T>(
    iterable: Iterable<T>,
    count: number,
    allowLess: boolean,
): Array<T>

function last(iterable)
function last(iterable, count)
function last(iterable, count, allowLess)
```

###### async

```ts
function last<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): Promise<T>

function last<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    count: number,
): Promise<Array<T>>

function last<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    count: number,
    allowLess: boolean,
): Promise<Array<T>>
```

The `last` function is just like the `first` function except it returns the items from the end of the iterable instead
of the items at the start of the iterable.

```js
import last from '@jx/iter/sync/last.mjs'

last([1,2,3,4,5,6])
// 6

last([])
// -> throws Error("Can't get last from empty iterable")

last([1,2,3,4], 2)
// [3,4]

last([1,2,3,4], 6)
// -> throws Error("Iterable is too short to get last 6 items")

last([1,2,3,4], 6, true)
// [1,2,3,4]
```
