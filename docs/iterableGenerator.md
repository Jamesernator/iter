### `iterableGenerator`

###### sync

```ts
function iterableGenerator<T, Args extends any[]>(
    genFunc: (...args: Args) => Iterator<T>
): (...args: Args) => Iterable<T>
```

###### async

```ts
function iterableGenerator<T, Args extends any[]>(
    genFunc: (...args: Args) => AsyncIterator<T>
): (...args: Args) => AsyncIterable<T>
```

The `iterableGenerator` function is designed for wrapping generator functions so that they can be re-used as iterables multiple times.

NOTE: Strictly speaking it can be used on *any* function that returns an Iterator (not an Iterable!), but it's most commonly going to be
used with a generator function that yields values.

This is more easily shown by an example:

```js
import iterableGenerator from '@jx/iter/sync/iterableGenerator.mjs'

const range = iterableGenerator(function* range(min, max) {
    for (let i = min; i < max; i += 1) {
        yield i
    }
})

const oneToFour = range(1, 5)

Array.from(oneToFour) // [1,2,3,4]

// If range were simply the generator function this would
// be an empty array as generators can only be consumed once
Array.from(oneToFour) // [1,2,3,4]
```
