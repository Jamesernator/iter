### `merge`

###### sync

There is no sync version of merge.

###### async

```ts
function merge<T>(
    asyncIterables: Array<AsyncOrSyncIterable<T>>,
): AsyncIterable<T>
```

Merge combines any number of async iterables into a single async iterable. When requesting the next item it races all unfinished iterators to get the next item each time until all iterables are exhausted.

```js
async function* ticks(time) {
    for (let i = 0 ; i < Infinity ; i++) {
        await new Promise(resolve => setTimeout(resolve, time))
    }
}

// ticks are interleaved so items from ticks(2000) will occur twice as much
// as from ticks(1000)
for await (const tick of merge([ticks(1000), ticks(2000)])) {
    console.log(tick)
}
```
