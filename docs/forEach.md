### `forEach`

###### sync

```ts
function forEach<T>(
    iterable: Iterable<T>,
): void

function forEach<T>(
    iterable: Iterable<T>,
    func: (item: T, index: number) => any,
): void

function forEach(iterable)
function forEach(iterable, func)
```

###### async

```ts
function forEach<T>(
    iterable: Iterable<T>,
): Promise<void>

function forEach<T>(
    iterable: Iterable<T>,
    func: (item: T, index: number) => Promise<any> | any,
): void
```

The `forEach` function invokes the given function for each item in the iterable (`await`-ing the result in case of async before proceeding).

If no function is passed it will simply iterate through each item in the iterable which might trigger side effects.
This generally isn't recommended but might be useful if you need to consume a resource that can't be closed directly.

```js
import forEach from '@jx/iter/forEach.mjs'

let total = 0
forEach([1,2,3,4], i => total += i)
total
// 10
```
