### `pairWise`

### sync

```ts
function pairWise<T>(
    iterable: Iterable<T>,
    allowShorter?: boolean,
): Iterable<[T, T]>
```

### async

```ts
function pairWise<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    allowShorter?: boolean,
): AsyncIterable<[T, T]>
```

The `pairWise` when given an iterable creates a new iterable that for every
item in the iterable it will emit a an array containing the item and the item
directly following that item.

If the array contains zero or only a single item then `pairWise` will throw an error unless `allowShorter` is `true`.

```js
import pairWise from '@jx/iter/sync/pairWise.mjs'

Array.from(pairWise([1,2,3,4,5]))
// [[1,2], [2,3], [3,4], [4,5]]

Array.from(pairWise([1]))
// -> throws Error can't get pair from sequence of size 1

Array.from(pairWise([1], true))
// []
```

```js
import concat from '@jx/iter/async/concat.mjs'
import pairWise from '@jx/iter/async/pairWise.mjs'
import takeUntil from '@jx/iter/async/pairWise.mjs'

// supposing you have an event source that implements AsyncIterable
async function main() {
    const canvasElement = document.getElementById('myCanvas')
    while (true) {
        const mouseDown = event(canvasElement, 'mousedown')
        const mouseUp = event(document, 'mouseup')
        const mouseMoves = events(document, 'mousemove')
        // Include the initial location the mouse was clicked in the output line
        const drawingEvents = concat([mouseDown], takeUntil(mouseMoves, _ => mouseUp))
        for (const [point1, point2] of pairWise(drawingEvents)) {
            // suppose we had a drawLineBetween function for drawing event locations
            // to the canvas via offsetX and offsetY
            drawLineBetween(point1, point2)
        }
    }
}
```
