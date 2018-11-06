const puppeteer = require('puppeteer');

(async () => {
  // Make sure to run yarn start before running tests
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:1234/');

  const appSelector = '.App';
  await page.waitForSelector(appSelector);

  const infoLink = 'ul > a:nth-child(2)';
  await page.waitForSelector(infoLink);
  await page.click(infoLink);
  
  const infoPage = 'div.Information-body';
  await page.waitForSelector(infoPage);
  
  // Take a screenshot is a good way of debugging and seeing what browser sees
  // await page.screenshot({path: 'finished_page.png'});
  
  await browser.close();
})();
