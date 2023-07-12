const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
    console.log(`actively crawling ${ currentURL }`);

    try {
        const res = await fetch(currentURL);

        if (res.status > 399) {
            console.log(`error in fetch with status code : ${ res.status }, on page : ${ currentURL }`);
            return;
        }

        const contentType = res.headers.get('content-type');

        if (!contentType.includes('text/html')) {
            console.log(`non html response, content type : ${ contentType }, on page : ${ currentURL }`);
            return;
        }
    }
    catch (err) {
        console.log(`error in fetch : ${ err.message }, on page : ${ currentURL }`);
    }
}

function getURLsFromHTML (htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    
    linkElements.forEach(element => {
        if (element.href.slice(0, 1) === '/') {
            // relative
            try {
                const urlObj = new URL(`${ baseURL }${ element.href }`);
                urls.push(urlObj.href);
            }
            catch (err) {
                console.log(err.message)
            }
        }
        else {
            // absolute
            try {
                const urlObj = new URL(element.href);
                urls.push(urlObj.href);
            }
            catch (err) {
                console.log(err.message)
            }
        }
    });

    return urls;
};

function normalizeURL (urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${ urlObj.hostname }${ urlObj.pathname }`;

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }

    return hostPath;
};

module.exports = {
    crawlPage,
    getURLsFromHTML,
    normalizeURL
};