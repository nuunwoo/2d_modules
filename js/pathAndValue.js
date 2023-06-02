// TODO: 예외처리 및 타입체크 등..

const { isObject } = require("./typeCheck");

// const DEFAULT_SPLITTER = '/'
const SPLITTER = '/'

const hasSub = keyStrings => !!keyStrings.filter(v => !v.endsWith(SPLITTER)).length
const getSub = (obj, keyStrings) => keyStrings.reduce((acc, keyStr) => {
    let target = obj
    if(keyStr.slice(-1) !== SPLITTER) {
        const keys = keyStr.split(SPLITTER).map(v => [v])
        keys.forEach(v => target = target[v])
    }
    return keyStr.endsWith(SPLITTER) ? [ ...acc, keyStr ] // keyStr which has no sub
        : (Object.keys(target).length && isObject(target))
            ? [ ...acc, ...Object.keys(target).map(subKey => keyStr + SPLITTER + subKey) ]
            : [ ...acc, SPLITTER + keyStr + SPLITTER]
}, [])

/**
 *
 * @param obj ex)
 * {
 *  a1 : 'a1',
 *  a2 : {
 *      a2_1 : {
 *          a2_1_1 : 123
 *          a2_1_2 : ''
 *      },
 *      a2_2 : ['a', 2, '2']
 *  }
 * }
 * @returns ex) [ '/a1/', '/a2/a2_1/a2_1_1/', '/a2/a2_1/a2_1_2/', '/a2/a2_2/' ]
 */
const getKeyStr = obj => {
    const getNextKeys = keyStrings => hasSub(keyStrings) ? getNextKeys(getSub(obj, keyStrings)) : keyStrings
    return getNextKeys(Object.keys(obj))
}

/**
 *
 * @param obj
 * @param key
 * @returns [ { path(='/../../key/') : value } (, { path : value } (, { path : value } ... ) )  ]
 */
const pathAndValue = (obj, key) => {
    const pathList = getKeyStr(obj).reduce((acc, cur) => {
        const target = SPLITTER + key + SPLITTER // => /key/
        const path = cur.slice(0, cur.indexOf(target) + target.length)
        return cur.includes(target) && !acc.includes(path)
            ? [ ...acc, path ] : [ ...acc ]
    }, [])

    return pathList.map(path => {
        const keys = path.split(SPLITTER).filter(v => v)

        let value = obj
        keys.forEach(v => value = value[v])

        const keyVal = {}
        keyVal[path] = value

        return keyVal
    })
}

module.exports = {
    getKeyStr,
    pathAndValue
}