### `reverse`

###### sync

```ts
function reverse<T>(
    iterable: Iterable<T>,
): Iterable<T>
```

###### async

```ts
function reverse<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): AsyncIterable<T>
```

The `reverse` function creates a new iterable which when iterated will emit
the items in reverse order.

NOTE: Due to the nature of `reverse` we do consume O(n) extra space to store
the array in.

```js
Array.from(reverse([1,2,3,4]))
// [4,3,2,1]
```
