import iterableGenerator from "./iterableGenerator.js";
import iterator from "./--iterator.js";

const pairWise = iterableGenerator(
    function* pairWise<T>(
        iterable: Iterable<T>,
        allowShorter: boolean=false,
    ) {
        const iter = iterator(iterable);
        try {
            const { value, done } = iter.next();
            if (done) {
                if (allowShorter) {
                    return;
                }
                throw new Error(`[pairWise] Can't get a pair from an empty sequence`);
            }

            let last = value;
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
            iter.return!();
        }
    },
);

export { pairWise as default };
