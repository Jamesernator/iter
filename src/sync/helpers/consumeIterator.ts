
export default function consumeIterator(iterator: Iterator<any>, count=1) {
    for (let i = 0; i < count; i += 1) {
        iterator.next();
    }
}
