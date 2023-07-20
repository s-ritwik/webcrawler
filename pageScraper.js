const scraperObject =
{
    url: 'https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-using-node-js-and-puppeteer',
    async scraper(browser)
    {
        let page =await browser.newPage();
        console.log(`going to ${this.url}--`);
        await page.goto(this.url);
    }
}
 module.exports= scraperObject;