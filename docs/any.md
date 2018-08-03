### `any`

###### sync

```ts
function any<T>(
    iterable: Iterable<T>,
    predicate: (value: T, index: Number) => any,
): boolean

function any(iterable, predicate = x => x)
```

###### async

```ts
function any<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate: (value: T, index: Number) => Promise<any> | any,
): Promise<boolean>

function any(asyncIterable, predicate = x => x)
```


The `any` function returns true if the passed predicate function returns `true`
for at least one item in the give iterable. With no predicate passed it will use the identity function to determine truthiness.

If the iterable is empty we use vacuous truth and always return `false`.


```js
import any from '@jx/iter/sync/any.mjs'

any([1,2,3,4,5], x => x > 4) === true;
any([1,2,3,4,5], x => x > 12) === false;

// Vacuous truth
any([], x => x > 4) === false;

// Default predicate is identity
any([true, false, 0, '']) === true;
any([false, 0, '', null]) === false;
```
