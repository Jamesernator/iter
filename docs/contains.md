
### `contains`

###### sync

```ts
function contains<T>(
    iterable: Iterable<T>,
    value: T,
    equalityTest: (value: T, item: T) => any,
): boolean

function contains(iterable, equalityTest = Object.is)
```

###### async

```ts
function contains<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    value: T,
    equalityTest: (value: T, item: T) => any,
): Promise<boolean>

function contains(asyncIterable, equalityTest = Object.is)
```

The `contains` function returns `true` if and only if the given iterable contains the value passed. This is tested by calling the `equalityTest` function with each item in the iterable and the value we're searching for.

```js
import contains from '@jx/iter/sync/contains.mjs'

contains([1,2,3,4], 3) === true;
contains([1,2,3,4], 12) === false;
contains([], null) === false;

// Object.is default
contains([NaN, -0, 'banana'], NaN) === true;
contains([-0], 0) === false;

// Custom test function
contains([-0], 0, (a, b) => a === b) === true;
contains([NaN], NaN, (a, b) => a === b) === false;

contains(
    [[1,2], [3,4], [4,5]],
    [3,4],
    (array1, array2) => array1[0] === array2[0] && array1[1] === array2[1],
) === true;
```
