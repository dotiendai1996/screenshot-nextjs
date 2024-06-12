const scraperObject = {
	async scraper(browser: any, tracking_no: string){
		let url = `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${tracking_no}`;
		let page = await browser.newPage();
		console.log(`Navigating to ${url}...`);
		await page.goto(url);
		// Wait for the required DOM to be rendered
		async function scrapeCurrentPage() {
			try {
				await page.waitForSelector('p.tb-status-detail', {timeout: 10000}); // Need to change
				// console.log('Done wait selector');
				let values = await page.$$eval('p.tb-status-detail', (els: any) => {
					els = els.map((el: any) => el.textContent);
					return els;
				});
				// console.log('status pageScarper ', values);
				return values[0];
			} catch(e) {
				console.log(JSON.stringify(e));
				await page.close();
				await browser.close();
				return null;
			}
		}
		let data = await scrapeCurrentPage();
		// console.log(data);
		return data;
		
	}
}

module.exports = scraperObject;