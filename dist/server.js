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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hiveos_1 = require("./modules/hiveos");
const node_cron_1 = __importDefault(require("node-cron"));
const lol_db_1 = __importDefault(require("lol.db"));
const profit_1 = require("./modules/profit");
const whattomine_1 = require("./modules/whattomine");
let db = (0, lol_db_1.default)("db.json", true);
const whaitTime = 60; // segundos
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const coins = yield (0, whattomine_1.GetCoins)();
            const profit = yield (0, profit_1.GetProfit)(coins);
            const best = yield (0, profit_1.GetBestProfit)(profit);
            const hiveos = yield (0, hiveos_1.HiveOsGetWorker)();
            const atualFlightSheet = hiveos.flight_sheet.name;
            let bestCnt = db.get('best.count')[0];
            if (best.coin !== atualFlightSheet) {
                if (bestCnt < whaitTime) {
                    bestCnt = bestCnt + 10;
                    console.log(`Profit Switch atual ${atualFlightSheet} whait ${best.coin} cnt ${bestCnt}s of ${whaitTime}`);
                }
                if (bestCnt >= whaitTime) {
                    yield db.set('best.coin', best.coin);
                    yield (0, hiveos_1.HiveOsSetFlightSheet)(best.coin);
                    yield db.push('best.log', { date: Date.now(), coin: best.coin, profit: best.profit });
                    console.log(`Profit Switch  changed from ${bestCnt} to ${best.coin}`);
                }
            }
            else
                bestCnt = 0;
            yield db.set('best.count', [bestCnt]);
        }
        catch (error) {
            console.log('ERRO: ', error);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!db.get('best.log'))
        yield db.set('best.log', []);
    if (!db.get('best.count'))
        yield db.set('best.count', [0]);
    yield db.set('best.count', [0]);
    node_cron_1.default.schedule('*/10 * * * * *', () => getData());
    console.log('Profit Switch is running!');
}))();
