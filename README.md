## Configuration in config.json

# Basic

cost: You must fill in the energy cost

farmId: You must fetch your farmID in hiveos API

workerId: You must fetch your workerID in hiveos API

token: Create your token in your hiveos account, in the sessions tab (Personal Tokens)

# Coins

!! Here you need to have knowledge about the data structure of a JSON

For each coin, an object must be filled out containing the following:
```json
    {
      "coin": "ETH", << The currency symbol
      "enable": false, << Can enable or disable coin mining
      "hashrate": 60.0, << Total hashrate mining this coin
      "power": 140.0 << Total power mining this coin
    }
```


Ex:
```json
{
  "cost": 0.0,
  "hiveos": {
    "farmId": 0,
    "workerId": 0,
    "token": "hiveonToken"
  },
  "coins": [
    {
      "coin": "ETH",
      "enable": false,
      "hashrate": 60.0,
      "power": 140.0
    },
    {
      "coin": "SERO",
      "enable": true,
      "hashrate": 20.36,
      "power": 130.0
    }
  ]
}
```

# Flight Sheets

Flight Sheets must be named with the same currency symbol
Ex.
For example for Ethereum the symbol is ETH, in turn the Flight Sheets must be named ETH in capital letters

# futures

[] Dual Mining
[] Coin Overclock Set (also for dualcoin)