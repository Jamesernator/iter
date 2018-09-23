### `zipLongest`

###### sync

```ts
type UnwrapIterable<T> = T extends Iterable<infer R> ? R : never
type UnwrappedArray<Arr> = { [P in keyof Arr]: UnwrapIterable<Arr[P]> }

// The "|" means Iterables will be typed as a tuple if it can be narrowed to be so
function zipLongest<Iterables extends Array<Iterable<any>> | [Iterable<any>]>(
    iterables: Iterables
): Iterable<UnwrappedArray<Iterables>>
```

###### async

```ts
type UnwrapIterable<T> = T extends AsyncOrSyncIterable<infer R> ? R : never
type UnwrappedArray<Arr> = { [P in keyof Arr]: UnwrapIterable<Arr[P]> }

// The "|" means Iterables will be typed as a tuple if it can be narrowed to be so
function zipLongest<Iterables extends Array<AsyncOrSyncIterable<any>> | [AsyncOrSyncIterable<any>]>(
    iterables: Iterables
): AsyncIterable<UnwrappedArray<Iterables>>
```

The `zipLongest` function is like `zip` except that instead of stopping
when the first iterable is done it will continue until all iterables are complete,
for the remaining values that can't be filled `undefined` will be used instead.

```js
import zipLongest from '@jx/iter/sync/zipLongest.mjs'

const nums = [1,2,3,4]
const strs = ['foo', 'bar', 'baz']
const booleans = [true, true, false, false, true]

Array.from(zipLongest([nums, strs, booleans]))
// [
//   [1, 'foo', true],
//   [2, 'bar', true],
//   [3, 'baz', false],
//   [4, undefined, false],
//   [undefined, undefined, true],
// ]
```