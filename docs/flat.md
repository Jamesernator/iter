
### `flat`

###### sync

```ts
function flat<T>(
    iterable: Iterable<Iterable<T>>,
): Iterable<T>

function flat(iterable)
```

###### async

```ts
function flat<T>(
    asyncIterable: AsyncOrSyncIterable<AsyncOrSyncIterable<T>>,
): AsyncIterable<T>

function flat(asyncIterable)
```

The `flat` function takes in an iterable of iterables and returns a new iterable
which is equivalent to concatenating all the iterables in the source iterable.

NOTE: Common implementations of `flat` (aka `flatten`) allow for mixed `Iterable<T> | T` or for a depth parameter to the `flat` function.
Currently I'm considering how overloading should work in this case, it's most likely to become two functions `flat(iterable, allowNonIterableValues=false)` and `flatDeep(iterable, depth, allowNonIterableValues=false)` but this is TBD.


```js
import flat from '@jx/iter/sync/flat.mjs'

flat([[1,2], [3,4], [5,6]])
// [1,2,3,4,5,6]

flat([1,[2,3]])
// -> throws Error("1 is not iterable")
```
