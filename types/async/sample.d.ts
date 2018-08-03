import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";

export default
    function sample<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        sampleCount?: 'single',
    ): Promise<T>

export default
    function sample<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        sampleCount: number,
        allowShorter?: boolean
    ): Promise<Array<T>>
