import { coins } from '../../config.json'
import { BinanceCoinPrice } from './binance'
import { GetQuote } from './currencyQuote'
import { GetCoin } from './minerstat'

export async function GetProfit(priceCoin: any[]){
  try {

    
    let coin = await GetCoin(coins)
    
    //await BinanceCoinPrice(coins)

    //const coinCote = await GetQuote('USD-BRL')
    
    // whattomine
    let keycoins = await Object.keys(priceCoin)

    let result: { [x: string]: any }[] = []

    for (let index = 0; index < keycoins.length; index++) {
      
      let key:any = keycoins[index]
      let cnk: any = priceCoin[key];
      
      await coin.map( (cn: { coin: any; algorithm: string; price: number }) => {
        if (cnk.tag === cn.coin && cn.algorithm.toLowerCase().includes(cnk.algorithm.toLowerCase())) {
          
          let price: number = cn.price// * coinCote.USDBRL.bid
          let estimated_rewards: number = parseFloat(cnk.estimated_rewards)
          let revProfit: number = price * estimated_rewards
          
          //console.log({ coin: cn.coin, algorithm: cn.algorithm, price, estimated_rewards, revProfit })
          
          result.push({ coin: cn.coin, algorithm: cn.algorithm, price, estimated_rewards, revProfit })

        }
      })
      
    }
    
    return result

  } catch (error: any) {
    let msg: string = JSON.stringify({ module: "GetProfit", erro: error})
    throw new Error(msg)
  }
}

export async function GetBestProfit(profit: any[]){
  try {

    let Profit: any[] = []
    let ProfitCoin: any[] = []
    
    // profit = lucro
    await profit.map( async pf => {
      await Profit.push(pf.revProfit)
      await ProfitCoin.push({ profit: pf.revProfit, coin: pf.coin})
    })
    
    const max = Math.max.apply(Math, Profit)
    const filter = ProfitCoin.find(el => el.profit === max)

    return filter

  } catch (error: any) {
    let msg: string = JSON.stringify({ module: "GetBestProfit", erro: error})
    throw new Error(msg)
  }
}
