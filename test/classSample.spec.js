const { Library } = require('../js/classSample')

test('classSample', () => {
    const input = Library('test').addText('_007').addText('_A').get()
    const output = 'test_007_A'
    expect(input).toEqual(output)

    // TODO: Jest does not support private class fields
    // https://github.com/facebook/jest/issues/9022
    // expect((target) => testLibrary.#target = target).toThrow(SyntaxError)
})