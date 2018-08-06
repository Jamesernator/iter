
### `debug`

###### sync

```ts
function debug<T>(
    iterable: Iterable<T>,
    iteratee?: (item: T, index: number) => void,
): Iterable<T>
```

###### async

```ts
function debug<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    iteratee?: (item: T, index: number) => void | Promise<void>,
): AsyncIterable<T>
```

The `debug` function invokes the debuggerFunction on each item and index in the given iterable. In the async version we also `await` the result of calling the debug function.

```js
import debug from '@jx/iter/sync/debug.mjs'

let total = 0
// will invoke the built in debugger for each item
for (const item of debug([1,2,3,4], item => { debugger })) {
    total += item
}
total // 10, unchanged

```
