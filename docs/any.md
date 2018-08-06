### `any`

###### sync

```ts
function any<T>(
    iterable: Iterable<T>,
    predicate?: (item: T, index: number) => any,
): boolean
```

###### async

```ts
function any<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate?: (item: T, index: number) => any | Promise<any>,
): Promise<boolean>
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
