
### `all`

###### sync

```ts
function all<T>(
    iterable: Iterable<T>,
    predicate?: (item: T, index: number) => any,
): boolean
```

###### async

```ts
function all<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate?: (item: T, index: number) => any | Promise<any>,
): Promise<boolean>
```

The `all` function will return `true` if and only if the predicate function passed returns a truthy value for all items in the iterable. Otherwise it returns `false`.

NOTE: `all` uses vacuous truth so `all(emptyIterable)` is always `true`.

```js
import all from '@jx/iter/sync/all.mjs';

all([1,2,3,4], x => x > 0) === true;
all([1,3,5,6], x => x % 2 === 0) === false;

// Vacuous truth
all([], x => x > Infinity) === true;

// No arguments uses identity
all([true, 1, "bar", "baz"]) === true;
all([null, false, 0]) === false;
all([true, false]) === false;
```
