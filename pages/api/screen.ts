import type { NextApiRequest, NextApiResponse } from 'next';
import startBrowser from '../../app/lib/browser';
import pageController from '../../app/lib/pageController';
type ResponseData = {
    tracking_no: string,
    status: string
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
    let tracking_no = await req.query?.id?.toString();
    // console.log(JSON.stringify(req.query.id));
    let browserInstance = startBrowser();

    // Pass the browser instance to the scraper controller
    let status = await pageController(browserInstance, tracking_no ?? "");
    // console.log('important ', status);

  res.status(200).json({ tracking_no: tracking_no || '', status: status || null })
}