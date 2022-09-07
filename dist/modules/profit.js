"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBestProfit = exports.GetProfit = void 0;
const config_json_1 = require("../config.json");
const currencyQuote_1 = require("./currencyQuote");
const minerstat_1 = require("./minerstat");
function GetProfit(coins) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // minerstat
            let coinsList = '';
            yield config_json_1.whattomine.coins.map(coin => {
                let { enable } = coin;
                if (coin.coinSet.length)
                    coin.coinSet.map(sc => coinsList += sc + ',');
                if (enable)
                    coinsList += '';
            });
            coinsList = coinsList.slice(0, -1);
            let coin = yield (0, minerstat_1.GetCoin)(coinsList);
            const coinCote = yield (0, currencyQuote_1.GetQuote)('USD-BRL');
            // whattomine
            let keycoins = yield Object.keys(coins);
            let result = [];
            for (let index = 0; index < keycoins.length; index++) {
                let key = keycoins[index];
                let cnk = coins[key];
                yield coin.map((cn) => {
                    if (cnk.tag === cn.coin && cn.algorithm.toLowerCase().includes(cnk.algorithm.toLowerCase())) {
                        let price = cn.price * coinCote.USDBRL.bid;
                        let estimated_rewards = parseFloat(cnk.estimated_rewards);
                        let revProfit = price * estimated_rewards;
                        result.push({ coin: cn.coin, algorithm: cn.algorithm, price, estimated_rewards, revProfit });
                    }
                });
            }
            return result;
        }
        catch (error) {
            throw new Error((error.message).toString());
        }
    });
}
exports.GetProfit = GetProfit;
function GetBestProfit(profit) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let Profit = [];
            let ProfitCoin = [];
            yield profit.map((pf) => __awaiter(this, void 0, void 0, function* () {
                yield Profit.push(pf.revProfit);
                yield ProfitCoin.push({ profit: pf.revProfit, coin: pf.coin });
            }));
            const max = Math.max.apply(Math, Profit);
            const filter = ProfitCoin.find(el => el.profit === max);
            return filter;
        }
        catch (error) {
            throw new Error((error.message).toString());
        }
    });
}
exports.GetBestProfit = GetBestProfit;
