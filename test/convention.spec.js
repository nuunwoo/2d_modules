const { toSnake, toPascal, toCamel,
    keyToSnake, keyToPascal, keyToCamel
} = require('../js/convention')

const str1 = 'abAbcdDefAgh'     // camelCase
const str2 = 'AbAbbdCx'         // PascalCase
const str3 = 'ab_ab_cdefg_gha'  // snake_case
const str4 = 'Abc_Def'          //
const str5 = 'abcde'            //

test('toSnake', () => {
    expect(toSnake(str1)).toEqual([ 'ab_abcd_def_agh', true ])
    expect(toSnake(str2)).toEqual([ 'ab_abbd_cx', true ])
    expect(toSnake(str3)).toEqual([ 'ab_ab_cdefg_gha', false ])
    expect(toSnake(str4)).toEqual([ 'Abc_Def', false ])
    expect(toSnake(str5)).toEqual([ 'abcde', false ])
})
test('toPascal', () => {
    expect(toPascal(str1)).toEqual([ 'AbAbcdDefAgh', true ])
    expect(toPascal(str2)).toEqual([ 'AbAbbdCx', false ])
    expect(toPascal(str3)).toEqual([ 'AbAbCdefgGha', true ])
    expect(toPascal(str4)).toEqual([ 'AbcDef', true ])
    expect(toPascal(str5)).toEqual([ 'abcde', false ])
})
test('toCamel', () => {
    expect(toCamel(str1)).toEqual([ 'abAbcdDefAgh', false ])
    expect(toCamel(str2)).toEqual([ 'abAbbdCx', true ])
    expect(toCamel(str3)).toEqual([ 'abAbCdefgGha', true ])
    expect(toCamel(str4)).toEqual([ 'abcDef', true ])
    expect(toCamel(str5)).toEqual([ 'abcde', false ])
})