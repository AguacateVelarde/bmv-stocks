const puppeteer = require('puppeteer')
const { BMVMainDomain } = require('./constants')

async function loadAllStocks () {
  const stocks = []
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1600, height: 800 })

  const loadData = async () => {
    const data = await page.$$eval('#tableMercados tr', (tds) =>
      tds.map((td) => td.innerText
        .replace(/\n/g, '|')
        .replace(/\t/g, '|')
        .replace(/\|\|/g, '|'))
    )
    data.shift()
    return data
  }

  const saveStock = (data) =>
    data.map((element) => {
      const [
        symbol,
        serie,
        updateHour,
        lastPrice,
        PPP,
        beforePrice,
        maxPrice,
        minPrice,
        volume,
        totalCost,
        OPS,
        points,
        percentual
      ] = element.split('|')
      return stocks.push({
        symbol,
        serie,
        updateHour,
        lastPrice,
        PPP,
        beforePrice,
        maxPrice,
        minPrice,
        volume,
        totalCost,
        OPS,
        points,
        percentual
      })
    })

  await page.goto(BMVMainDomain)

  loadData().then(saveStock)

  const lastPage = await page.evaluate(() => {
    const lastPage = document.querySelector('#tableMercados_paginate > span > a:last-child')
    return +lastPage.textContent
  })

  for (let i = 0; i < lastPage; i++) {
    await page.click('#tableMercados_next')
    loadData().then(saveStock)
  }

  return stocks
}

module.exports = { loadAllStocks }
