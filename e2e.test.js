import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("contains the welcome text", async () => {
    await page.goto("http://localhost:3000/simple-weather");
    await page.waitForSelector(".App-init");
    const text = await page.$eval(".App-init h4", (e) => e.textContent);
    expect(text).toContain("Hello on SimpleWeather");
  });

  afterAll(() => browser.close());
});
