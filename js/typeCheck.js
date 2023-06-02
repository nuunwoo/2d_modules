// module.exports = v => typeof v !== 'object' ? typeof v
//                 : v === null ? 'null'
//                 : v === undefined ? 'null'
//                 : isNaN(Number(v.length)) ? 'object'
//                 : 'array'

const isNull = v => v === null
const isUndefined = v => v === undefined
const isString = v => typeof v === 'string'
const isNumber = v => typeof v === 'number'
const isFunction = v => typeof v === 'function'
const isMap = v => v instanceof Map
const isSet = v => v instanceof Set
const isError = v => v instanceof Error
const isObject = v =>
    Object.prototype.toString.call(v) === '[object Object]'
    || (typeof v === 'object' && isNaN(Number(v.length))
    && !isMap(v) && !isSet(v) && !isError(v))
const isArray = v => (Array.isArray && Array.isArray(v))
    || Object.prototype.toString.call(v) === '[object Array]'
    || typeof v === 'object' && !isNaN(Number(v.length))
const isSymbol = v => typeof v === 'symbol'

const getType = v => typeof v !== 'object' ? typeof v
                    : isNull(v) ? 'null'
                    : isUndefined(v) ? 'undefined'
                    : isMap(v) ? 'map'
                    : isSet(v) ? 'set'
                    : isError(v) ? 'error'
                    : isArray(v) ? 'array'
                    : 'object'

module.exports = {
    isNull, isUndefined, isString, isNumber, isFunction, isSymbol,
    isObject, isArray, isMap, isSet, isError,
    getType
}