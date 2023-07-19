const puppeteer = require('puppeteer');
const browserObject=require('./browser');
const scraperController= require('./pageController.js')

let browserInstance=browserObject.start_browser();
//instance of browser made

//give it to scraper
scraperController(browserInstance);