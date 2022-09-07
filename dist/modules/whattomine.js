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
exports.GetCoins = void 0;
const axios_1 = __importDefault(require("axios"));
const config_json_1 = require("../config.json");
const uri = "https://whattomine.com/coins.json";
function GetCoins() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let params = '';
            yield config_json_1.whattomine.coins.map(coin => {
                let { name, enable, hashrate, power } = coin;
                if (enable)
                    params += `${name}=true&factor%5B${name}_hr%5D=${hashrate}&factor%5B${name}_p%5D=${power}&`;
                else
                    params += `factor%5B${name}_hr%5D=${hashrate}&factor%5B${name}_p%5D=${power}&`;
            });
            params += `factor%5Bcost%5D=${config_json_1.whattomine.cost}&factor%5Bcost_currency%5D=USD&sort=Profitability24&volume=0&revenue=24h&factor%5Bexchanges%5D%5B%5D=&factor%5Bexchanges%5D%5B%5D=binance&factor%5Bexchanges%5D%5B%5D=bitfinex&factor%5Bexchanges%5D%5B%5D=bitforex&factor%5Bexchanges%5D%5B%5D=bittrex&factor%5Bexchanges%5D%5B%5D=coinex&factor%5Bexchanges%5D%5B%5D=dove&factor%5Bexchanges%5D%5B%5D=exmo&factor%5Bexchanges%5D%5B%5D=gate&factor%5Bexchanges%5D%5B%5D=graviex&factor%5Bexchanges%5D%5B%5D=hitbtc&factor%5Bexchanges%5D%5B%5D=hotbit&factor%5Bexchanges%5D%5B%5D=ogre&factor%5Bexchanges%5D%5B%5D=poloniex&factor%5Bexchanges%5D%5B%5D=stex&dataset=Main`;
            const result = yield axios_1.default.get(`${uri}?${params}`);
            return result.data.coins;
        }
        catch (error) {
            throw new Error((error.message).toString());
        }
    });
}
exports.GetCoins = GetCoins;
/*
    eth Etash
    e4g Ethash4G
    zh Zhash
    cnh CNHeavy
    cng CNGPU
    cnf CNFast
    cx Cortex
    eqa Aion
    cc CuckooCycle
    
    cr29 Cuckaroo(d)29
    ct31 Cuckatoo31
    ct32 Cuckatoo32
    eqb Beam
    rmx RandomX
    ns NeoScrypt
    al Autolykos
    ops Octopus
    eqz EquihashZero
    
    zlh ZelHash
    kpw KawPow
    ppw ProgPow
    x25x X25X
    fpw FiroPow
    vh Verthash
*/
