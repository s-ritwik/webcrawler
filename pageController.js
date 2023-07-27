const pageScraper= require('./pageScraper');
const fs=require('fs')//jsonn


async function scrapeAll(browserInstance){
    let browser;
    try{
        browser=await browserInstance;
        //for scraping particular books uncommnet following code
        let scrapedData = {};
		// Call the scraper for different set of books to be scraped,for all scraping uncomment
		scrapedData['Travel'] = await pageScraper.scraper(browser, 'Travel');
        scrapedData['Mystery'] = await pageScraper.scraper(browser, 'Mystery');

		await browser.close();
       // const fs = require('fs');

// Assuming scrapedData is an object with key-value pairs

// Convert each property (which should be an object) to a JSON string and add a new line character after each one
const jsonStringArray = [];
for (const key in scrapedData) {
  if (Object.hasOwnProperty.call(scrapedData, key)) {
    const data = scrapedData[key];
    jsonStringArray.push(JSON.stringify(data) + '\n');
  }
}

fs.writeFile('data.json', jsonStringArray.join(''), 'utf8', function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("The data has been scraped and saved successfully! View it at './data.json'");
});

        //await pageScraper.scraper(browser);
    }
    catch(err)
    {
        console.log('cant make browser instance because-- ',err);
    }
}
module.exports=(browserInstance) => scrapeAll(browserInstance)