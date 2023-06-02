const { getType } = require('./typeCheck')

const argsType = (...args) => {
    const it = args.values()
    let iter = it.next()

    const types = new Map()

    while (!iter.done) {
        const val = iter.value
        const type = getType(val)

        const typeMap = types.get(type) || new Map()
        const valCount = typeMap.get(val) ? typeMap.get(val)+1 : 1
        const typeMapVal = typeMap.set(val, valCount)
        types.set(type, typeMapVal)

        iter = it.next()
    }

    return types
}

module.exports = argsType