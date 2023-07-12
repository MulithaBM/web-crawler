const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('getURLsFromHTML absolute', () => {
    const input = {
        "https://test.test" : 3,
        "https://test.test/path1" : 2,
        "https://test.test/path2" : 4
    };

    const actual = sortPages(input);
    const expected = [
        ['https://test.test/path2', 4],
        ['https://test.test', 3], 
        ['https://test.test/path1', 2]
    ];

    expect(actual).toEqual(expected);
});