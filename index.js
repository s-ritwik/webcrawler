//const puppeteer = require('puppeteer');
const browserObject=require('./browser');
const scraperController= require('./pageController')

let browserInstance=browserObject.startBrowser();
//instance of browser made

//give it to scraper
scraperController(browserInstance);