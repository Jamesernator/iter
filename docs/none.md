### `none`

###### sync

```ts
function none<T>(
    asyncIterable: Iterable<T>,
    predicate?: (item: T, index: number) => any,
): boolean
```

###### async

```ts
function none<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate?: (item: T, index: number) => any | Promise<any>,
): Promise<boolean>
```

The `none` function takes an iterable and a predicate function and returns `true` if and only if all the items in the array do not succeed the predicate.

If the iterable is empty we use vacuous truth and return `true` regardless of the predicate.

```js
import none from '@jx/iter/async/none.mjs'

const messages = ['Hello world!', 'I is a very good chat app']

none(messages, message => message.trim() === '')
// true

none(messages, message => message.startsWith('Hello'))
// false

none([], _ => true)
// true
```
