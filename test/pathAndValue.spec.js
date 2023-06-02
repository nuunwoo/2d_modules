const { getKeyStr, pathAndValue } = require('../js/pathAndValue')
const { isObject } = require('../js/typeCheck')

const obj1 = {
    a1: {
        a1_1: {},
        a1_2: {
            a1_2_1: 'a121',
            a1_2_2: 'a122',
        },
        a1_3: {
            a1_3_1: 'a131',
            a1_3_2: 'a132',
            a1_3_3: 'a133',
            a2_2: '???'
        },
    },
    a2: {
        a2_1: {},
        a2_2: {
            a2_2_1: {
                a2_2_1_1: 'a2211'
            },
            a2_2_2: {
                a2_2_2_1: {
                    a2_2_2_1_1: 'a22211'
                },
                a2_2_2_2: {
                    a2_2_2_2_1: 'a22221',
                    a2_2_2_2_2: 'a22222'
                }
            },
            a2_2_3: ''
        },
        a2_3: {
            a2_3_1: '',
            a2_3_2: 'a232'
        },
        a2_4: {
            a2_4_1: ''
        },
    },
    a3: {

    }
}

const obj2 = {
    a1 : 'a1',
    a2 : {
        a2_1 : {
            a2_1_1 : 123,
            a2_1_2 : ''
        },
        a2_2 : ['a', 2, '2']
    }
}

test('getKeyStr', () => {
    expect(getKeyStr(obj1).length).toBe(17)
    expect(getKeyStr(obj1)).toEqual([
        '/a1/a1_1/',
        '/a1/a1_2/a1_2_1/', '/a1/a1_2/a1_2_2/',
        '/a1/a1_3/a1_3_1/', '/a1/a1_3/a1_3_2/', '/a1/a1_3/a1_3_3/', '/a1/a1_3/a2_2/',
        '/a2/a2_1/',
        '/a2/a2_2/a2_2_1/a2_2_1_1/', '/a2/a2_2/a2_2_2/a2_2_2_1/a2_2_2_1_1/', '/a2/a2_2/a2_2_2/a2_2_2_2/a2_2_2_2_1/', '/a2/a2_2/a2_2_2/a2_2_2_2/a2_2_2_2_2/', '/a2/a2_2/a2_2_3/',
        '/a2/a2_3/a2_3_1/', '/a2/a2_3/a2_3_2/',
        '/a2/a2_4/a2_4_1/',
        '/a3/'
    ])
    expect(getKeyStr(obj2).length).toBe(4)
    expect(getKeyStr(obj2)).toEqual([
        '/a1/',
        '/a2/a2_1/a2_1_1/', '/a2/a2_1/a2_1_2/', '/a2/a2_2/'
    ])
})

test('pathAndValue', () => {
    const obj = obj1
    const key = 'a2_2'
    const pav = pathAndValue(obj, key)
    const pav0keys = Object.keys(pav[0])
    const pav1keys = Object.keys(pav[1])

    expect(pav.length).toBe(2)

    expect(pav0keys).toEqual(['/a1/a1_3/a2_2/'])
    expect(pav1keys).toEqual(['/a2/a2_2/'])

    expect(pav[0][pav0keys[0]]).toBe('???')
    expect(isObject(pav[1][pav1keys[0]])).toBeTruthy()

    const path = pav0keys[0].split('/').filter(v => v)
    expect(path[path.length - 1]).toBe(key)

    let value = { ...obj }
    path.forEach(p => value = value[p])
    expect(value).toBe('???')
})