const scraperObject =
{
    url: 'http://books.toscrape.com',
    async scraper(browser)
    {
        let page =await browser.newPage();
        console.log(`going to ${this.url}--`);
        await page.goto(this.url);

        //wait for dom
        await page.waitForSelector('.page_inner');
        // get urls of all books
        let urls =await page.$$eval('section ol > li',links =>
        {
            //book in stock?
            links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
            
            links=links.map(el => el.querySelector('h3 > a').href)
            return links;
        });
        console.log(urls,"now we will scrap these sites");
        
        let pagePromise = (link) => new Promise(async(resolve,reject) =>
        {
            let dataObj={};
            let newPage = await browser.newPage();
            await newPage.goto(link);
            dataObj['bookTitle'] =await newPage.$eval('.product_main > h1', text => text.textContent);
            dataObj['bookPrice'] =await newPage.$eval('.price_color',text => text.textContent);
            // dataObj['noAvailable'] =await newPage.$eval('.instock.availability', text= 
            // {
            //     text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
			// 	// Get the number of stock available
			// 	let regexp = /^.*\((.*)\).*$/i;
			// 	let stockAvailable = regexp.exec(text)[1].split(' ')[0];
			// 	return stockAvailable;
            // });
            dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', img =>img.src);
            
            dataObj['bookDescription'] = await newPage.$eval('#product_description',div=> div.nextSibling.nextSibling.textContent)
            dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
			resolve(dataObj);
            await newPage.close();
        });
        console.log("finally showing scrapped data...\n")
        for(link in urls)
        {
            let currentPageData = await pagePromise(urls[link]);

            console.log(currentPageData['bookTitle']);
        }
    }   
}
 module.exports= scraperObject;