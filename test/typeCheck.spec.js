const {
    getType,
    isNull,
    isUndefined,
    isString,
    isNumber,
    isFunction,
    isObject,
    isArray,
    isSymbol,
    isMap,
    isSet,
    isError
} = require('../js/typeCheck')

const str = [
    'test', 'a01', '1234', '{ myTest }', '\n', '', 'undefined', 'null',
    JSON.stringify({ a: 1, b: 5, c: 7}), 3 + ''
]
const num = [
    123, 0, -12, -12.3, Math.random() * 3, NaN, Infinity, -Infinity,
    parseInt('123'), parseInt('-123'), Number('abc')
]
const fn = [
    () => {}, function(){}, (function(){ return function(){} })()
]
const obj = [
    {}, { a: 3, b: 5, c: 7 }, JSON.parse('{ "test" : "test" }')
]
const arr = [
    [], [ 1, 3, 5 ], [ {}, {}, [] ]
]
const sym = [
    Symbol(), Symbol.for('symKey')
]
const _null = [null]
let _u
const _undefined = [ undefined, _u, obj[0].a ]

const map = new Map()
const set = new Set()
const err = new Error()

describe('typeCheck.js', () => {

    test('isString', () => {
        str.map(v => expect(isString(v)).toBeTruthy())
    })
    test('isNumber', () => {
        num.map(v => expect(isNumber(v)).toBeTruthy())
    })
    test('isFunction', () => {
        fn.map(v => expect(isFunction(v)).toBeTruthy())
    })
    test('isObject', () => {
        obj.map(v => expect(isObject(v)).toBeTruthy())
    })
    test('isArray', () => {
        arr.map(v => expect(isArray(v)).toBeTruthy())
    })
    test('isSymbol', () => {
        sym.map(v => expect(isSymbol(v)).toBeTruthy())
    })
    test('isNull', () => {
        _null.map(v => expect(isNull(v)).toBeTruthy())
    })
    test('isUndefined', () => {
        _undefined.map(v => expect(isUndefined(v)).toBeTruthy())
    })
    test('isMap', () => {
        expect(isMap(map)).toBeTruthy()
    })
    test('isSet', () => {
        expect(isSet(set)).toBeTruthy()
    })
    test('isError', () => {
        expect(isError(err)).toBeTruthy()
    })

    test('getType', () => {
        str.map(v => expect(getType(v)).toBe('string'))
        num.map(v => expect(getType(v)).toBe('number'))
        obj.map(v => expect(getType(v)).toBe('object'))
        arr.map(v => expect(getType(v)).toBe('array'))
        sym.map(v => expect(getType(v)).toBe('symbol'))
        _null.map(v => expect(getType(v)).toBe('null'))
        _undefined.map(v => expect(getType(v)).toBe('undefined'))
        expect(getType(map)).toBe('map')
        expect(getType(set)).toBe('set')
        expect(getType(err)).toBe('error')
    })
})