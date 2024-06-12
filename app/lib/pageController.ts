const pageScraper = require('./pageScraper');
export default async function pageController(browserInstance: any, tracking_no: string) {
	// console.log('tracking_no controller', tracking_no, browserInstance);
	let browser;
	try{
		browser = await browserInstance;
		let status = await pageScraper.scraper(browser, tracking_no);
		await browser.close();
		// console.log('status pageController', status);
		return status;
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

// module.exports = (browserInstance: any, tracking_no: string) => scrapeAll(browserInstance, tracking_no)