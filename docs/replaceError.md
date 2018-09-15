### `replaceError`

###### sync

```ts
function replaceError<T>(
    iterable: Iterable<T>,
    replacer: (error: any) => Iterable<T>,
): Iterable<T>
```

###### async

```ts
function replaceError<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    replacer: (error: any) => AsyncOrSyncIterable<T> | Promise<AsyncOrSyncIterable<T>>,
): AsyncIterable<T>
```

The `replaceError` function allows you to recover from an error within an iterable
by replacing the iterable with another iterable. This is more useful in the async variant
for recovering from things like network failures and other such things.

```js
import replaceError from '@jx/iter/sync/replaceError.mjs'

function* values() {
    yield 1
    yield 2
    throw new Error('Oops')
}

Array.from(replaceError(values(), () => [3, 4]))
// [1,2,3,4]
```
