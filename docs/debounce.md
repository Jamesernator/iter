
### `debounce`

###### sync

There is no sync `debounce`.

##### async

```ts
function debounce<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    time: number,
    trailing?: boolean
): AsyncIterable<T>
```

The `debounce` function filters a stream so that it only emits an item if the amount of time passed is greater than the `time` parameter.

There's two behaviours on how it does this depending on whether `trailing` is used or not.
- When not in trailing mode we immediately discard items if not enough has passed since the last time has emitted.
- When in trailing mode each item is delayed for the delay time and emitted if no other items have been emitted in that time.

```js
import debounce from '@jx/iter/async/debounce.mjs'

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

async function* values() {
    for (let i = 0; i < 5; i++) {
        yield i
        await delay(100)
    }
    await delay(1000)
    yield 99
}

// NOTE: Both of these examples assume the delays run within a few milliseconds
// of the expected time, obviously if arbitrary delays occur because of other
// work on the event loop then you might observe other values

/*
 In this example we will *definitely* observe the number 0 but
 we should not observe any of 1,2,3,4 as they are emitted within < 500ms of the
 last, we will also observe 99
 */
async function example1() {
    const seq = values()
    const debounced = debounce(seq, 500)
    for await (const item of seq1) {
        console.log(item)
    }
}

/*
  When we're using the trailing edge we delay each item to check if no other
  elements will be emitted before the delay has run out, if the delay runs out
  we emit the item so for the same sequence as `example1` we expect
  that only 4 and 99 are emitted
 */
async function example2() {
    const seq = values()
    const debounced = debounce(seq, 500)
    for await (const item of seq2) {
        console.log(item)
    }
}
```
