### `toObject`

###### sync

```ts
interface ObjectMap<Value> {
    [key: string]: Value,
    [key: number]: Value,
}

function toObject<Value>(
    iterable: Iterable<[string | number, Value, ...any[]]>,
): ObjectMap<Value>
```

###### async

```ts
interface ObjectMap<Value> {
    [key: string]: Value,
    [key: number]: Value,
}

function toObject<Value>(
    asyncIterable: AsyncOrSyncIterable<[string | number, Value, ...any[]]>,
): ObjectMap<Value>
```

The `toObject` takes an iterable of array pairs and returns an object where the
keys are the the first item in each array and the values are the second item.
If the same key appears twice the most recent value will be used.

By default the prototype of the object is `null` but this can be set by passing
in the second argument.

All the values on the object are set by setting descriptors so setters will not
be invoked (although Proxy's `[[SetDescriptor]]` will be), all descriptors are set
with `{ enumerable: true, writable: true, configurable: true }`.


```js
toObject(['useNewParser', true], ['maxStatements', 3])
// { useNewParser: true, maxStatements: 3 } // with __proto__ of null

toObject(['useNewParser', true], ['maxStatements', 3], Object.prototype)
// { useNewParser: true, masStatements: 3 }
// with Object.prototype methods e.g. __proto__, hasOwnProperty
```
