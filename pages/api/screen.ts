import type { NextApiRequest, NextApiResponse } from 'next';
import edgeChromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
// import startBrowser from '../../app/lib/browser';
import pageController from '../../app/lib/pageController';
type ResponseData = {
    tracking_no: string,
    status: string,
    error?: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    // async function getStatus() {
    //     await res.setHeader('Content-Type', 'application/json');
    //     await res.end(JSON.stringify({ tracking_no, status: status || null }));
    // }
    // getStatus();
    let browser;
    let tracking_no = await req.query?.id?.toString();

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
    } catch (err: any) {
        res.status(200).json({ tracking_no: tracking_no || '', status: '', error: JSON.stringify(Object.assign({}, 
          err,
          {      // Explicitly pull Error's non-enumerable properties
            name: err.name,
            message: err.message,
            stack: err.stack
          }
        ))});
        return false;
    }

    // Pass the browser instance to the scraper controller
    let status = await pageController(browser, tracking_no ?? "");
    // console.log('important ', status);

  res.status(200).json({ tracking_no: tracking_no || '', status: status || null });
}