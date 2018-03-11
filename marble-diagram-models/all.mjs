import _all from "../sync/all.mjs"
import { Result } from "./--types.mjs"

export default function all(seq, predicate=x => x) {
    return seq.case({
        Incomplete() {
            return Result.Pending()
        },

        Complete(arr, { time }) {
            try {
                const values = arr.map(o => o.value)
                return Result.Value({ time, value: _all(values, predicate) })
            } catch (err) {
                return Result.Error({ time, err })
            }
        },

        EarlyError(_, err) {
            return Result.Error(err)
        },
    })
}
