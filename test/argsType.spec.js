const argsType = require('../js/argsType')

// const a = { a : 1 }
// const b = { a : 1 }
// const c = a
// expect(a).toEqual(b) // pass
// expect(a).toBe(b) // fail
// expect(a).toBe(c) // pass

test('argsType', () => {
    const args = argsType(
        'a', 'b', null, 'undefined', [], { name: 'Dr.Jones', age : 81 },
        'a', 100, [ 2, 3, 5, 8, 13 ], 'abc', undefined, -123, -12.3
    )

    const str = args.get('string')
    expect(str.get('a')).toBe(2)
    expect(str.get('b')).toBe(1)
    expect(str.get('undefined')).toBe(1)
    expect(str.get('abc')).toBe(1)
    expect(str.size).toBe(4)

    const num = args.get('number')
    expect(num.get(100)).toBe(1)
    expect(num.get(-123)).toBe(1)
    expect(num.get(-12.3)).toBe(1)
    expect(num.size).toBe(3)

    const arr = args.get('array')
    const arrIt = arr.keys()
    let arrNext = arrIt.next()
    while(!arrNext.done) {
        arrNext.value
        expect(arr.get(arrNext.value)).toBe(1)
        arrNext = arrIt.next()
    }
    expect(arr.size).toBe(2)

    const obj = args.get('object')
    const objKey = obj.keys().next().value
    expect(obj.get(objKey)).toBe(1)
    expect(obj.size).toBe(1)

    expect(args.get('null').get(null)).toBe(1)
    expect(args.get('undefined').get(undefined)).toBe(1)
})