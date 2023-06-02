const argsType = require('./argsType')
const { isFunction } = require('./typeCheck')

// TODO: cb 함수에선 error 어떻게 받을지 고민
const interceptor = (task, callback) => (...args) => {
    return !(argsType(...args).get('error'))
        ? task.apply(null, args)
        : callback.apply(null, args.slice(1))
}

const defaultCallback = (...args) => !(argsType(...args).get('error'))
    ? console.log(args)
    : console.log(argsType(...args).get('error'))

const waterfall = (tasks, callback) => {
    // TODO: tasks array check
    // TODO: task function check

    callback = isFunction(callback) ? callback : defaultCallback

    const interceptedTasks = tasks.map(task => interceptor(task, callback))
    const iterator = [ ...interceptedTasks ].reverse().entries()

    let next = iterator.next()
    let callbackHell

    while(!next.done) {
        callbackHell = next.value[0] === 0
            ? next.value[1].bind(null, callback)
            : next.value[1].bind(null, callbackHell)
        next = iterator.next()
    }

    callbackHell()
}

module.exports = waterfall