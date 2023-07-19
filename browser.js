const puppeteer= require('puppeteer')

async function start_browser()
{
    let browser;
    try{
        console.log('opening...')
        browser = await puppeteer.launch(
            {
                headless:false,
                args: ["--disable-setuid-sandbox"],
                'ignoreHTTPSErrors':true
            }
        );
    } catch(err)
    {
        console.log("error detected....")
    }
    return browser;//browser's instance returned
}
module.exports={
    start_browser
};