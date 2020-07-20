const puppeteer = require("puppeteer");

const fs = require("fs");

async function loadAllStocks() {
  const stocks = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 800 });

  const loadData = async () => {
    const data = await page.$$eval("#tableMercados tr", (tds) =>
      tds.map((td) => {
        return td.innerText
          .replace(/\n/g, "|")
          .replace(/\t/g, "|")
          .replace(/\|\|/g, "|");
      })
    );
    data.shift();
    return data;
  };

  const saveStock = (data) =>
    data.map((element) => {
      let tempElement = element.split("|");
      stocks.push({
        symbol: tempElement[0],
        serie: tempElement[1],
        updateHour: tempElement[2],
        lastPrice: tempElement[3],
        PPP: tempElement[4],
        beforePrice: tempElement[5],
        maxPrice: tempElement[6],
        minPrice: tempElement[7],
        volume: tempElement[8],
        totalCost: tempElement[9],
        OPS: tempElement[10],
        points: tempElement[11],
        percentual: tempElement[12],
      });
    });

  await page.goto("https://www.bmv.com.mx/es/mercados/capitales");

  loadData().then(saveStock);
  for (let i = 0; i < 13; i++) {
    await page.click("#tableMercados_next");
    await page.waitFor(1000);
    loadData().then(saveStock);
  }

  return stocks;
}

module.exports = { loadAllStocks };
