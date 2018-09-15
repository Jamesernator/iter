### `toArray`

###### sync

```ts
function toArray<T>(
    terable: Iterable<T>,
): Array<T>
```

###### async

```ts
function toArray<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): Promise<Array<T>>
```

The `toArray` simply converts the given iterable into an array. That's it.

```js
import toArray from '@jx/iter/sync/toArray.mjs'

function* values() {
    yield 1
    yield 2
    yield 3
}

toArray(values())
// [1,2,3]
```
