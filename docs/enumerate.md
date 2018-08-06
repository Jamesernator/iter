
### `enumerate`

###### sync

```ts
function enumerate<T>(
    iterable: Iterable<T>,
): Iterable<[number, T]>
```

###### async

```ts
function enumerate<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): AsyncIterable<[number, T]>
```

The enumerate function emits pairs of `[index, item]` for each item in the source iterable.


```js
import enumerate from '@jx/iter/sync/enumerate.mjs'

let total = 0
for (const [index, item] of enumerate([1,2,3])) {
    total += index * item
}
total // 8
```
