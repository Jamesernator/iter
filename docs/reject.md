
### `reject`

###### sync

```ts
function reject<T>(
    iterable: Iterable<T>,
    predicate: (item: T, index: number) => any,
): Iterable<T>
```

###### async

```ts
function reject<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate: (item: T, index: number) => any | Promise<any>,
): AsyncIterable<T>
```

The reject function is the opposite of `filter`, for every item if the
`predicate` function returns a truthy value it will ignore that item.
This is mainly to improve readability for some applications.

```js
import reject from '@jx/iter/sync/reject.mjs'

const places = [
    { name: 'Paris', distance: 344 },
    { name: 'New York', distance: 5576 },
    { name: 'Shanghai', distance: 9207 },
    { name: 'Rome', distance: 1435 },
    { name: 'Sydney', distance: 17013 },
    { name: 'Rio de Janeiro', distance: 9290 },
    { name: 'Berlin', distance: 933 },
]

reject(places, place => place.distance < 4000)
// [{ name: 'Paris', distance: 344 }, { name: 'Rome', distance: 1435 }, { name: 'Berlin', distance: 933 }]


reject([], val => val > 12)
// []
```
