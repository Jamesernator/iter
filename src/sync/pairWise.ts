import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

const pairWise = iterableGenerator(
    function* pairWise<T>(
        iterable: Iterable<T>,
        allowShorter: boolean=false,
    ): Generator<[T, T]> {
        const iter = iterator(iterable);
        try {
            const res = iter.next();
            if (res.done) {
                if (allowShorter) {
                    return;
                }
                throw new Error(`[pairWise] Can't get a pair from an empty sequence`);
            }

            let last = res.value;
            let gotPair = false;
            for (const item of iter) {
                gotPair = true;
                yield [last, item];
                last = item;
            }

            if (!gotPair && !allowShorter) {
                throw new Error(`[pairWise] Can't get a pair from sequence of size 1`);
            }
        } finally {
            iter.return();
        }
    },
);

export { pairWise as default };
