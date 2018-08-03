
### `all`

###### sync

```ts
function all<T>(
    iterable: Iterable<T>,
    predicate: (value: T, index: Number) => any,
): boolean

function all(iterable, predicate = x => x)
```

###### async

```ts
function all<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate: (value: T, index: Number) => Promise<any> | any,
): Promise<boolean>

function all(asyncIterable, predicate = x => x)
```

##### `sync.all(iterable, predicate=x => x)`
##### `async.all(asyncIterable, predicate=x => x)`

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
