### `lastIndexOf`

###### sync

```ts
function lastIndexOf<T>(
    asyncIterable: Iterable<T>,
    item: T,
    equality?: (item: T, otherItem: T) => any, 
): number | null

```

###### async

```ts
function lastIndexOf<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    item: T,
    equality?: (item: T, otherItem: T) => any, 
): Promise<number | null>
```

The `lastIndexOf` method returns the last index at which the item appears in the iterable if it's found, otherwise it returns `null`.
Optionally you can also use a different method of checking for equality than `Object.is`.

```js
import lastIndexOf from '@jx/iter/sync/lastIndexOf.mjs'

lastIndexOf([1,2,3,4,5], 3)
// 2

lastIndexOf([1, NaN, -0, 0], NaN)
// 1

lastIndexOf([1, NaN, 0], -0)
// null // as by Object.is 0 !== -0

lastIndexOf(
    [{ x: 10, y: 20 }, { x: 20, y: 30 }],
    { x: 20, y: 30 },
    (point1, point2) => point1.x === point2.x && point1.y === point2.y
)
// 1
```
