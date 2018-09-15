### `sample`

###### sync

```ts
function sample<T>(
    iterable: Iterable<T>,
    sampleCount?: 'single',
): T

function sample<T>(
    iterable: Iterable<T>,
    sampleCount: number,
    allowShorter?: boolean
): Array<T>
```

###### async

```ts
function sample<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    sampleCount?: 'single',
): Promise<T>

function sample<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    sampleCount: number,
    allowShorter?: boolean
): Promise<Array<T>>
```

The `sample` function returns a random sampling from the iterable for the size
requested. If no size is given we simply return a random item, otherwise we return
an array of `sampleCount` items randomly chosen from the iterable.

If `allowShorter` is `false` or not provided then if the iterable is too short we
will throw an error rather than returning an array without sufficiently many items.

```js
sample([1,2,3,4,5,6])
// A random item from the sequence

sample([1,2,3,4,5,6], 2)
// [?, ??] where ? and ?? are two distinct numbers from the given sequence
// in the same order that they appeared in the array

sample([])
// -> throws Error can't sample empty sequence

sample([1,2,3,4], 12)
// -> throws Error can't sample 12 items from sequence of size 4

sample([1,2,3,4], 12, true)
// [1,2,3,4]
```
