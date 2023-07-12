const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = 
    `<html>
        <body>
            <a href = 'https://test.test.test/path'>Test</a>
        </body>
    </html>`;
    const inputBaseURL = 'https://test.test.test'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://test.test.test/path'];

    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = 
    `<html>
        <body>
            <a href = '/path'>Test</a>
        </body>
    </html>`;
    const inputBaseURL = 'https://test.test.test'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://test.test.test/path'];

    expect(actual).toEqual(expected);
});

// absolute url and relative url
test('getURLsFromHTML multiple', () => {
    const inputHTMLBody = 
    `<html>
        <body>
            <a href = 'https://test.test.test/path1'>Test</a>
            <a href = '/path2'>Test</a>
        </body>
    </html>`;
    const inputBaseURL = 'https://test.test.test'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://test.test.test/path1', 'https://test.test.test/path2'];

    expect(actual).toEqual(expected);
});

// not an absolute url and doesn't starts with a '/'
test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = 
    `<html>
        <body>
            <a href = 'test'>Test</a>
        </body>
    </html>`;
    const inputBaseURL = 'https://test.test.test'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];

    expect(actual).toEqual(expected);
});

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

test('normalizeURL strip uppercase', () => {
    const input = 'https://TEST.test.test/path/';
    const actual = normalizeURL(input);
    const expected = 'test.test.test/path';

    expect(actual).toEqual(expected);
});