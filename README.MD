# BMV-stocks 🤠

## Bolsa mexicana de valores

```js
const { loadAllStocks } = require("bmv-stocks");
loadAllStocks().then((stocks) => {
  fs.writeFileSync("./stocks.json", JSON.stringify(stocks), function (
    err,
    data
  ) {
    if (err) {
      return console.log(err);
    }
  });

  process.exit(0);
});
```

The response should be an array with all objects follow the next interface :

```json
[
  {
    "symbol": "SPORT",
    "serie": "S",
    "updateHour": "03:10",
    "lastPrice": "13.39",
    "PPP": "13.39",
    "beforePrice": "12.37",
    "maxPrice": "13.39",
    "minPrice": "12.71",
    "volume": "2,818",
    "totalCost": "37,036.07",
    "OPS": "17",
    "points": "1.02",
    "percentual": "8.25"
  }
]
```

this project was create with ❤️
