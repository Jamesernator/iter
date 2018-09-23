### `zip`

###### sync

```ts
type UnwrapIterable<T> = T extends Iterable<infer R> ? R : never
type UnwrappedArray<Arr> = { [P in keyof Arr]: UnwrapIterable<Arr[P]> }

// The "|" means Ts will be typed as a tuple if it can be narrowed to be so
function zip<Ts extends Array<Iterable<any>> | [Iterable<any>]>(
    iterables: Ts
): Iterable<UnwrappedArray<Ts>>
```

###### async

```ts
type UnwrapIterable<T> = T extends AsyncOrSyncIterable<infer R> ? R : never
type UnwrappedArray<Arr> = { [P in keyof Arr]: UnwrapIterable<Arr[P]> }

// The "|" means Ts will be typed as a tuple if it can be narrowed to be so
function zip<Ts extends Array<AsyncOrSyncIterable<any>> | [AsyncOrSyncIterable<any>]>(
    iterables: Ts
): AsyncIterable<UnwrappedArray<Ts>>
```

The `zip` function combines any number of iterables into a new iterable that 
emits an array of the next item from each of the source iterables until one of 
the iterables is complete.

```js
import zip from '@jx/iter/sync/zip.mjs'

const nums = [1,2,3,4]
const strs = ['foo', 'bar', 'baz']
const booleans = [true, true, false, false, true]

Array.from(zip([nums, strs, booleans]))
// [
//   [1, 'foo', true],
//   [2, 'bar', true],
//   [3, 'baz', false],
// ]
```