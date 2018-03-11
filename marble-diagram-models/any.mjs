import _any from "../sync/any.mjs"
import { Result } from "./--types.mjs"

export default function any(seq, predicate=x => x) {
    return seq.case({
        Incomplete() {
            return Result.Pending()
        },

        Complete(arr, { time }) {
            try {
                const values = arr.map(o => o.value)
                for (const [index, value] of values) {
                    if (predicate(value)) {
                        return Result.Value({ time: arr[index].time, value: true })
                    }
                }
                return Result.Value({ time, value: false })
            } catch (err) {
                return Result.Error({ time, err })
            }
        },

        EarlyError(_, err) {
            return Result.Error(err)
        },
    })
}
