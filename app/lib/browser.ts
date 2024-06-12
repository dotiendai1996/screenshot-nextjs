// const puppeteer = require('puppeteer');
import edgeChromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export default async function startBrowser() {
	let browser;
	// Edge executable will return an empty string locally.
	const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE
	try {
	    console.log("Opening the browser......");
	    browser = await edgeChromium.puppeteer.launch({
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
