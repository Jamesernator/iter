### `toSet`

###### sync

```ts
function toSet<T>(
    iterable: Iterable<T>,
): Set<T>
```

###### async

```ts
function toSet<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): Promise<Set<T>>
```

The `toSet` function converts an iterable into a builtin `Set` object of the values.

```ts
toSet([1,2,3,4,1,2])
// Set { 1, 2, 3, 4 }
```
