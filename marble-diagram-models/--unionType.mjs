
const validStringType = /^([a-z]+)(\?)?(\?)?$/u

const arrayOfType = string => {
    return string.startsWith('[')
        && string.endsWith(']')
        && string.slice(1, -1).match(validStringType)
}

const objectOfType = string => {
    return string.startsWith('{')
        && string.endsWith('}')
        && string.slice(1, -1).match(validStringType)
}

const isOfType = (type, value) => {
    const typeofType = type.match(validStringType)[1]
    if (type.endsWith('??')) {
        return value === undefined
            || value === null
            || typeof value === typeofType
    } else if (type.endsWith('?')) {
        return value === null
            || typeof value === typeofType
    } else {
        return typeof value === typeofType
    }
}

function typeCheck(value, type) {
    if (type === 'any') {
        return true
    } else if (typeof type === 'string' && type.match(validStringType)) {
        return isOfType(type, value)
    } else if (typeof type === 'string' && arrayOfType(type)) {
        return Array.isArray(value)
            && value.every(item => typeCheck(item, type.slice(1, -1)))
    } else if (typeof type === 'string' && objectOfType(type)) {
        return value
            && Object.values(value).every(item => typeCheck(item, type.slice(1, -1)))
    } else if (typeof type === 'function') {
        return type(value, typeCheck)
    } else if (type && typeof type === 'object') {
        if (Array.isArray(type)) {
            return Array.isArray(value)
                && value.length === type.length
                && type.every((item, idx) => typeCheck(value[idx], item))
        } else {
            return value != null
                && Object.entries(type).every(([key, item]) => typeCheck(value[key], item))
        }
    } else {
        throw new Error("Invalid type check")
    }
}

const outer = new WeakSet()

// eslint-disable-next-line no-useless-escape
const identifierName = /^(?:[$_\p{ID_Start}])(?:[$_\u200C\u200D\p{ID_Continue}])*$/u

const reservedWords = [
    'await',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'enum',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'implements',
    'import',
    'in',
    'instanceof',
    'interface',
    'let',
    'new',
    'package',
    'private',
    'protected',
    'public',
    'return',
    'static',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield',
]

/* unionType takes in an object and returns another object with the type names
    being the keys of the original object and the expected argument types
    as an aray as the value

    if the right-hand side of any types is not an Array (as per Array.isArray)
    it will be wrapped in an array with a single element
*/
export default function unionType(descriptionObject) {
    const typeOfEach = new WeakMap()
    const result = {
        [Symbol.hasInstance](value) {
            return typeOfEach.has(value)
        },
    }
    for (const [key, type] of Object.entries(descriptionObject)) {
        if (!key.match(identifierName)) {
            throw new Error(`Expected identifier name as key not ${ key }`)
        }
        if (reservedWords.includes(key)) {
            throw new Error(`union type name should not be a reserved word`)
        }
        const normalizedType = Array.isArray(type) ? type : [type]
        result[key] = function(...args) {
            Object.freeze(args)
            if (outer.has(type) && !typeCheck(args, type.type)) {
                throw new TypeError(`Wrong arguments passed to type ${ key }`)
            } else if (!outer.has(type) && !typeCheck(args, normalizedType)) {
                throw new TypeError(`Wrong arguments passed to type ${ key }`)
            }
            const unionObject = {
                [Symbol.toStringTag]: key,
                case(obj) {
                    if (key in obj) {
                        const func = obj[key]
                        if (typeof func !== 'function') {
                            throw new TypeError("Can't case using a non-function")
                        }
                        return Reflect.apply(func, obj, args)
                    } else if ('else' in obj) {
                        const else_ = obj.else
                        if (typeof else_ !== 'function') {
                            throw new TypeError(`else case is not a function`)
                        }
                        return Reflect.apply(else_, obj, args)
                    } else {
                        throw new Error(`No function for case ${ key } and no default provided`)
                    }
                },

                toString() {
                    return `${ key }(${ args.map(String).join(",") })`
                },

                data: args,
            }

            typeOfEach.set(unionObject, result[key])

            return Object.freeze(unionObject)
        }
        Object.defineProperty(result[key], 'name', { value: key })
        Object.defineProperty(result[key], Symbol.hasInstance, {
            value(item) {
                return typeOfEach.get(item) === result[key]
            },
        })
        Object.freeze(result[key])
    }

    Object.freeze(result)

    return result
}
