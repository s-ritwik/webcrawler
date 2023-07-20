const puppeteer= require('puppeteer')

async function startBrowser()
{
    let browser;
    try{
        console.log('opening...')
        browser = await puppeteer.launch(
            {
                headless:false,
                args: ["--disable-setuid-sandbox"],
                'ignoreHTTPSErrors': true
            }
        );
    } catch(err)
    {
        console.log("could not create instance ....",err);
    }
    return browser;//browser's instance returned
}
module.exports={
    startBrowser
};