### `first`

###### sync

```ts
function first<T>(
    iterable: Iterable<T>,
): T

function first<T>(
    iterable: Iterable<T>,
    count: number,
): Array<T>

function first<T>(
    iterable: Iterable<T>,
    count: number,
    allowLess: boolean,
): Array<T>

function first(iterable)
function first(iterable, count)
function first(iterable, count, allowLess)
```

###### async

```ts
function first<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): Promise<T>

function first<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    count: number,
): Promise<Array<T>>

function first<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    count: number,
    allowLess: boolean,
): Promise<Array<T>>
```

The `first` function returns the first item from the given iterable. If a second argument is passed then `first` will instead return an array of the `first` n elements.
If it can't get enough elements then it will throw an error unless the third argument is `true`.

```js
import first from '@jx/iter/sync/first.mjs'

first([1,2,3,4])
// 1

first([])
// -> throws Error("Iterable is empty")

first([1,2,3,4,5], 3)
// [1, 2, 3]

first([1,2,3,4], 5)
// -> throws Error("Iterable is too short")

first([1,2,3,4], 12, true)
// [1, 2, 3, 4]
```
