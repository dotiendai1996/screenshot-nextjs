// const puppeteer = require('puppeteer');
import edgeChromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default async function startBrowser() {
	let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        // headless: false,
	        // args: ["--disable-setuid-sandbox"],
			// 'ignoreHTTPSErrors': true
			args: edgeChromium.args,
			defaultViewport: edgeChromium.defaultViewport,
			executablePath: await edgeChromium.executablePath,
			headless: edgeChromium.headless,
			ignoreHTTPSErrors: true,
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}
