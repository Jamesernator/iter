### `map`

###### sync

```ts
function map<In, Out>(
    iterable: Iterable<In>,
    mapperFn: (item: In, index: number) => Out,
): Iterable<Out>
```

###### async

```ts
function map<In, Out>(
    asyncIterable: AsyncOrSyncIterable<In>,
    mapperFn: (item: In, index: number) => Promise<Out> | Out,
): AsyncIterable<Out>
```

The map function applies the given function to each item in the iterable giving a new iterable which emits the mapped items in the same order as the original iterable.

```js
import map from '@jx/iter/sync/map.mjs'

Array.from(map([1,2,3,4], x => x**2))
// [1, 4, 9, 16]

Array.from(map(['bob', 'charlie', 'mary'], (name, index) => [name, index]))
// [['bob', 0], ['charlie', 1], ['mary', 2]]

Array.from(map([], _ => { throw new Error('Oops!') }))
// [] // Error mapperFn is never invoked for empty sequence
```
