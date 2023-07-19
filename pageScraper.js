const scraperObject =
{
    url : 'http://books.toscrape.com',
    async scraper(browser)
    {
        let page =await browser.newPage();
        console.log(`going to ${url}--`);
        await page.goto(this.url);
    }
}

module.exports =scraperObject;