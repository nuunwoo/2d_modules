const waterfall = require('../js/waterfall')

/* sample */
const f1 = (callback, ...args) => callback('a')
const f2_1 = (callback, ...args) => {
    setTimeout(function() {
        callback('b-1')
    }, 100 * 7)
}
const f2_2 = (callback, ...args) => {
    setTimeout(function () {
        callback(args[0], 'b-2')
    }, 100 * 10)
}
const f2_3 = (callback, ...args) => {
    setTimeout(function() {
        callback('b-3', ...args)
    }, 100 * 4)
}
const f3 = (callback, ...args) => callback('c')

const err = new Error()
const f_e = (callback, ...args) => callback(err, '### error !!!')
/* // sample */

test('waterfall_default', done => {
    waterfall([f1, f2_1, f3], (...args) => {
        try {
            expect(args).toEqual(['c'])
            done()
        }
        catch (e) {
            done(e)
        }
    })
})

test('waterfall_args', done => {
    waterfall([f2_1, f2_2, f2_3], (...args) => {
        try {
            expect(args).toEqual(['b-3', 'b-1', 'b-2'])
            done()
        }
        catch (e) {
            done(e)
        }
    })
})

test('waterfall_error_1', done => {
    waterfall([f1, f_e, f3], (...args) => {
        try {
            expect(args).toEqual([err, '### error !!!'])
            done()
        }
        catch (e) {
            done(e)
        }
    })
})

test('waterfall_error_2', done => {
    const lastFn = jest.fn()
    waterfall([f1, f_e, lastFn], (...args) => {
        try {
            expect(lastFn).not.toBeCalled()
            done()
        }
        catch (e) {
            done(e)
        }
    })
})