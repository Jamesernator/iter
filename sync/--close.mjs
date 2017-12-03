
export default function close(iterator) {
    if (typeof iterator.return === 'function') {
        return iterator.return()
    }
    return undefined
}
