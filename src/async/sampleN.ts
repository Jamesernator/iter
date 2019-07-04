import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";
import enumerate from "./enumerate.js";

export default async function sampleN<T>(
  iterable: AsyncOrSyncIterable<T>,
  n: number,
  allowLess=false,
) {
  const chosenList: Array<T> = []
  for await (const [idx, item] of enumerate(iterable)) {
      if (idx < n) {
          chosenList.push(item)
      } else if (Math.random() < n/(idx + 1)) {
          const randomN = Math.floor(Math.random() * n)
          chosenList.splice(randomN, 1)
          chosenList.push(item)
      }
  }
  if (chosenList.length === n) {
      return chosenList
  } else if (allowLess) {
      return chosenList
  } else {
      throw new Error(`[sampleN] Can't pick ${ n } elements from ${ chosenList.length } items`)
  }
}

