### `toMap`

###### sync

```ts
function toMap<Key, Value>(
    iterable: Iterable<[Key, Value, ...any[]]>,
): Map<Key, Value>
```

###### async

```ts
function toMap<Key, Value>(
    asyncIterable: AsyncOrSyncIterable<[Key, Value, ...any[]]>,
): Promise<Map<Key, Value>>
```

The `toMap` function takes an iterable of arrays and returns a `Map` where the
keys are the first items of the arrays and the values are the second values.
Extra items on the end are allowed and will simply be ignored.

If the same key appears multiple times the last value will be used, if you want
more specialized behaviour than this use `groupBy`.

```js
toMap([['Carol', 23], ['Bob', 34], ['Eve', 28]])
// Map { 'Carol' => 23, 'Bob' => 34, 'Eve' => 28 }
```
