function printReport (pages) {
    const consoleWidth = process.stdout.columns;
    const separator = '='.repeat(consoleWidth);

    console.log(separator);
    console.log("CRAWLER REPORT");
    console.log(separator);

    const sortedPages = sortPages(pages);

    for (const page of sortedPages) {
        console.log(`found ${ page[1] } link(s) to ${ page[0] }`);
    }

    console.log(separator);
    console.log("END");
    console.log(separator);
}

function sortPages (pages) {
    const pagesArr = Object.entries(pages);
    
    pagesArr.sort((a, b) => {
        return b[1] - a[1];
    });

    return pagesArr;
}

module.exports = { 
    printReport,
    sortPages
};