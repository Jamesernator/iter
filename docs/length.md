### `length`

###### sync

```ts
function length<T>(
    iterable: Iterable<T>,
): number
```

###### async

```ts
function length<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): Promise<number>
```

The length function simply returns the number of items in the iterable.

```js
import length from '@jx/iter/sync/length.mjs'

length([1,2,3,4])
// 4

function* items() {
    yield 1
    yield 2
    yield 3
}

length(items())
// 3

length(new Set())
// 0
```
