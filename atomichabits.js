const puppeteer = require('puppeteer');
const xlsx = require("xlsx");

async function getPageData(url,page){

  await page.goto(url);

  const h1 = await page.$eval(".pdp-e-i-head", h1 => h1.innerText);
  const price = await page.$eval(".pdp-final-price", price => price.textContent);
  const isbn = await page.$eval(".h-content", isbn => isbn.textContent);
  const author = await page.$eval("#productOverview > div.col-xs-14.right-card-zoom.reset-padding > div > div.pdp-elec-topcenter-inner.layout > div.highlightsTileContent.highlightsTileContentTop.clearfix > div > ul > li:nth-child(5) > span.h-content", author => author.innerText);
  const publisher = await page.$eval("#productOverview > div.col-xs-14.right-card-zoom.reset-padding > div > div.pdp-elec-topcenter-inner.layout > div.highlightsTileContent.highlightsTileContentTop.clearfix > div > ul > li:nth-child(3) > span.h-content", publisher => publisher.textContent);

  return{
    Title: h1,
    Price: price,
    ISBN: isbn,
    Author: author,
    Publisher: publisher
  }

//h-content
  // const links = await page.$$eval('.favDp .product-tuple-image a', allAs => allAs.map(a => a.href));
  // const aoaLinks = links.map(l => [l]);



  await browser.close();
};

async function main(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const scrapedData = [];
  const data = await getPageData("https://www.snapdeal.com/product/atomic-habits-english-paperback-james/664572842675#bcrumbSearch:9781847941831",page);
  scrapedData.push(data);

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(scrapedData);
  xlsx.utils.book_append_sheet(wb,ws);
  xlsx.writeFile(wb, "books.xlsx");
}
console.log("Done");
main();
