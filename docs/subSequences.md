### `subSequences`

###### sync

```ts
// NOTE: If you need longer tuples I will considering adding the extra overloads
function subSequences<T>(
    iterable: Iterable<T>,
    size: 1,
    allowShorter?: boolean,
): Iterable<[T]>

function subSequences<T>(
    iterable: Iterable<T>,
    size: 2,
    allowShorter?: boolean,
): Iterable<[T, T]>

function subSequences<T>(
    iterable: Iterable<T>,
    size: 3,
    allowShorter?: boolean,
): Iterable<[T, T, T]>

function subSequences<T>(
    iterable: Iterable<T>,
    size: 4,
    allowShorter?: boolean,
): Iterable<[T, T, T, T]>

// All the rest of the numbers

function subSequences<T>(
    iterable: Iterable<T>,
    size: number,
    allowShorter?: boolean,
): Iterable<Array<T>>
```

###### async

```ts
// NOTE: If you need longer tuples I will considering adding the extra overloads
function subSequences<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    size: 1,
    allowShorter?: boolean,
): AsyncIterable<[T]>

function subSequences<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    size: 2,
    allowShorter?: boolean,
): AsyncIterable<[T, T]>

function subSequences<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    size: 3,
    allowShorter?: boolean,
): AsyncIterable<[T, T, T]>

function subSequences<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    size: 4,
    allowShorter?: boolean,
): AsyncIterable<[T, T, T, T]>

// All the rest of the numbers

function subSequences<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    size: number,
    allowShorter?: boolean,
): AsyncIterable<Array<T>>
```

The `subSequences` functions returns all sub-sequences of the given length of the sequence.

NOTE: If you're just wanting pairs then the `pairWise` function does
the same as `subSequences(it, 2)` but it's usage should be clearer for people
reading your code.

NOTE 2: This isn't to be confused with splitting the sequence into sized chunks, that'll come in another method later (probably called `chunks`!).

```js
Array.from(subSequences([1,2,3,4,5,6], 3))
// [[1,2,3], [2,3,4], [3,4,5], [4,5,6]]

Array.from(subSequences([1,2,3], 4))
// []
```
