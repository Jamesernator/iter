
### `createOperator`

###### sync

```ts
function createOperator<T, Rest extends any[], Return>(
    operator: (iterable: Iterable<T>, ...rest: Rest) => Return
): (iterable: Iterable<T>, ...rest: Rest) => Return
```

###### async
```ts
function createOperator<T, Rest extends any[], Return>(
    operator: (iterable: AsyncOrSyncIterable<T>, ...rest: Rest) => Return
): (asyncIterable: AsyncOrSyncIterable<T>, ...rest: Rest) => Return
```

The `createOperator` function takes a function and will return new function that behaves the same as the original function except instead of receiving the iterable directly it will be given an object that only has the required `Symbol.iterator`/`Symbol.asyncIterator` methods. This can be used to ensure that the first argument is always treated purely as an (async) iterable.


```js
import createOperator from '@jx/iter/sync/createOperator.mjs'

const sum = createOperator(function sum(iterable) {
    /* Even if an Array is passed to sum it won't be an array in the wrapped
        function so that we don't accidentally use array methods in here
    */
    let total = 0
    for (const item of iterable) {
        total += item
    }
    return total
})

sum([1,2,3,4]) === 10;
```
