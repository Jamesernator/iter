
export default function consumeIterator(iterator, count=1) {
    for (let i = 0; i < count; i++) {
        iterator.next()
    }
}
