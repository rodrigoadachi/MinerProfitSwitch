import axios from 'axios'
import { coins, cost } from '../../config.json'
import { whattomine } from '../../crypto.json'

const uri = "https://whattomine.com/coins.json"

interface iCoins {
  coin: string;
  enable: any;
  hashrate: any;
  power: any
}

interface iPrice {
  coin: string;
  algorithm: string;
  estimated_rewards: number;
}

const mountQuery = async (coins: iCoins[]) => {
  try {
    let query = ''

    await coins.map( async (cn: iCoins ) => {
      let {coin, enable, hashrate, power} = cn

      await whattomine.map( async wm => {
        let existCoin = wm.coins.includes(coin)
        
        if (existCoin)
          query += enable
            ? `${wm.name}=true&factor%5B${wm.name}_hr%5D=${hashrate}&factor%5B${wm.name}_p%5D=${power}&`
            : query += `factor%5B${wm.name}_hr%5D=${hashrate}&factor%5B${wm.name}_p%5D=${power}&`
      })
    })
    
    query += `factor%5Bcost%5D=${cost}&factor%5Bcost_currency%5D=USD&sort=Profitability24&volume=0&revenue=24h&factor%5Bexchanges%5D%5B%5D=&factor%5Bexchanges%5D%5B%5D=binance&factor%5Bexchanges%5D%5B%5D=bitfinex&factor%5Bexchanges%5D%5B%5D=bitforex&factor%5Bexchanges%5D%5B%5D=bittrex&factor%5Bexchanges%5D%5B%5D=coinex&factor%5Bexchanges%5D%5B%5D=dove&factor%5Bexchanges%5D%5B%5D=exmo&factor%5Bexchanges%5D%5B%5D=gate&factor%5Bexchanges%5D%5B%5D=graviex&factor%5Bexchanges%5D%5B%5D=hitbtc&factor%5Bexchanges%5D%5B%5D=hotbit&factor%5Bexchanges%5D%5B%5D=ogre&factor%5Bexchanges%5D%5B%5D=poloniex&factor%5Bexchanges%5D%5B%5D=stex&dataset=Main`
    
    return query

    } catch (error) {
      let msg: string = JSON.stringify({ module: "GetCoins", erro: error})
      throw new Error(msg)  
  }
}

export async function GetPriceCoins(){
  try {

    const params = await mountQuery(coins)
    
    const result = await axios.get(`${uri}?${params}`)

    return result.data.coins
    
  } catch (error: any) {
    let msg: string = JSON.stringify({ module: "GetCoins", erro: error})
    throw new Error(msg)
  }
}

/*
export async function GetPriceDualCoin() {

  await coins.map( async cn => {

    let {coin, enable, hashrate, power} = cn

    const twoCoin = coin.includes("+")

    if (twoCoin) {
      const splitCoin = coin.split("+")
      console.log(`two coin ${coin} 1: ${splitCoin[0]} 2: ${splitCoin[1]}`)
 
      let _params = ''

      //find coin 1
      whattomine.map( wm => {
        let existCoin0 = wm.coins.includes(splitCoin[0])
        if (existCoin0)
          _params += enable
            ? `${wm.name}=true&factor%5B${wm.name}_hr%5D=${hashrate}&factor%5B${wm.name}_p%5D=${power}&`
            : _params += `factor%5B${wm.name}_hr%5D=${hashrate}&factor%5B${wm.name}_p%5D=${power}&`
        
        let existCoin1 = wm.coins.includes(splitCoin[1])
        if (existCoin1)
        _params += enable
            ? `${wm.name}=true&factor%5B${wm.name}_hr%5D=${hashrate}&factor%5B${wm.name}_p%5D=${power}&`
            : _params += `factor%5B${wm.name}_hr%5D=${hashrate}&factor%5B${wm.name}_p%5D=${power}&`
      })

      _params += `factor%5Bcost%5D=${cost}&factor%5Bcost_currency%5D=USD&sort=Profitability24&volume=0&revenue=24h&factor%5Bexchanges%5D%5B%5D=&factor%5Bexchanges%5D%5B%5D=binance&factor%5Bexchanges%5D%5B%5D=bitfinex&factor%5Bexchanges%5D%5B%5D=bitforex&factor%5Bexchanges%5D%5B%5D=bittrex&factor%5Bexchanges%5D%5B%5D=coinex&factor%5Bexchanges%5D%5B%5D=dove&factor%5Bexchanges%5D%5B%5D=exmo&factor%5Bexchanges%5D%5B%5D=gate&factor%5Bexchanges%5D%5B%5D=graviex&factor%5Bexchanges%5D%5B%5D=hitbtc&factor%5Bexchanges%5D%5B%5D=hotbit&factor%5Bexchanges%5D%5B%5D=ogre&factor%5Bexchanges%5D%5B%5D=poloniex&factor%5Bexchanges%5D%5B%5D=stex&dataset=Main`
      
      const resultDual = await axios.get(`${uri}?${params}`)

      let keyDualCoins = await Object.keys(resultDual.data.coins)

      let result: { [x: string]: any }[] = []
  
      let coinDual0 = {}
      let coinDual1 = {}
      for (let index = 0; index < keyDualCoins.length; index++) {
        let key:any = keyDualCoins[index]
        let cnk: any = resultDual.data.coins[key];
        //console.log(`cnk.tag: ${cnk.tag} `)
        if (cnk.tag === splitCoin[0]) {
          console.log(`params: ${key} `,cnk.tag)
          allCoins.push(cnk)
        }
      }
      
      //let res = _result.data.coins.find( (item: { tag: any; }) => item.tag === splitCoin[0] )
            

      allCoins[coin] = {
          tag: coin,
          algorithm: 'FiroPow',
          block_time: '142.0',
          block_reward: 1.5625,
          block_reward24: 1.5625,
          last_block: 532011,
          difficulty: 2019.6096,
          difficulty24: 2029.6652688279269,
          nethash: 61085613962,
          exchange_rate: 0.0001141,
          exchange_rate24: 0.0001144741843971632,
          exchange_rate_vol: 21.23370821,
          exchange_rate_curr: 'BTC',
          market_cap: '$25,774,103',
          estimated_rewards: '0.64152',
          estimated_rewards24: '0.63835',
          btc_revenue: '0.0000732',
          btc_revenue24: '0.00007284',
          profitability: 63,
          profitability24: 64,
          lagging: false,
          timestamp: 1662301702
      }

      const result = await axios.get(`${uri}?${params}`)
      let allCoins = result.data.coins

    }

  })
}
*/

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
