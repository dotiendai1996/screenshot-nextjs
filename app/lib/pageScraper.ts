const scraperObject = {
	async scraper(browser: any, tracking_no: string){
		let url = `https://ops.hanoinhanh.com/auth/sign-in`;
		let page = await browser.newPage();
		console.log(`Navigating to ${url}...`);
		await page.goto(url);
		// Wait for the required DOM to be rendered
		async function scrapeCurrentPage() {
			try {
				await page.waitForSelector('p.MuiTypography-root', {timeout: 10000}); // Need to change
				// console.log('Done wait selector');
				let values = await page.$$eval('p.MuiTypography-root', (els: any) => {
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