### `indexOf`

###### sync

```ts
function indexOf<T>(
    iterable: Iterable<T>,
    item: T,
    equality?: (item: T, otherItem: T) => any, 
): number | null
```

###### async

```ts
function indexOf<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    item: T,
    equality?: (item: T, otherItem: T) => any, 
): Promise<number | null>
```

The `indexOf` method returns the index at which the item first appears in the iterable if it's found, otherwise it returns `null`.
Optionally you can also use a different method of checking for equality than `Object.is`.

```js
import indexOf from '@jx/iter/sync/indexOf.mjs'

indexOf([1,2,3,4,5], 3)
// 2

indexOf([1, NaN, -0, 0], NaN)
// 1

indexOf([1, NaN, 0], -0)
// null // as by Object.is 0 !== -0

indexOf(
    [{ x: 10, y: 20 }, { x: 20, y: 30 }],
    { x: 20, y: 30 },
    (point1, point2) => point1.x === point2.x && point1.y === point2.y
)
// 1
```
