const { normalizeURL } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL strip protocol', () => {
    const input = 'https://test.test.test/path';
    const actual = normalizeURL(input);
    const expected = 'test.test.test/path';

    expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
    const input = 'https://test.test.test/path/';
    const actual = normalizeURL(input);
    const expected = 'test.test.test/path';

    expect(actual).toEqual(expected);
});