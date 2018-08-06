
export default
    function sample<T>(
        iterable: Iterable<T>,
        sampleCount?: 'single',
    ): T

export default
    function sample<T>(
        iterable: Iterable<T>,
        sampleCount: number,
        allowShorter?: boolean
    ): Array<T>
