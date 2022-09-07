import { HiveOsGetWorker, HiveOsSetFlightSheet } from "./modules/hiveos"
import cron from 'node-cron'
import moment from 'moment-timezone'
const lolDb = require('lol.db')

import { GetBestProfit, GetProfit } from "./modules/profit"
import { GetPriceCoins } from './modules/whattomine'

let db = lolDb("db.json", true)
const whaitTime = 60 // segundos

async function getData() {
  try {
    const dateNow = moment(new Date()).tz('America/Bahia').format('YYYY-MM-DD HH:mm')
        
    const priceCoin = await GetPriceCoins()

    const profit = await GetProfit(priceCoin)

    const best = await GetBestProfit(profit)

    const hiveos = await HiveOsGetWorker()

    const atualFlightSheet = hiveos.flight_sheet.name
  
    let bestCnt = db.get('best.count')[0]
    
    if (best.coin !== atualFlightSheet) {

      if (bestCnt < whaitTime) {
        bestCnt = bestCnt + 10
        console.log(`Profit Switch atual ${atualFlightSheet} whait ${best.coin} cnt ${bestCnt}s of ${whaitTime}`)
      }
  
      if (bestCnt >= whaitTime) {
        await db.set('best.coin', best.coin)
        await HiveOsSetFlightSheet(best.coin)
        await db.push('best.log', { date: Date.now(), coin: best.coin, profit: best.profit })
        console.log(`${dateNow} Profit Switch  changed from ${bestCnt} to ${best.coin} profit ${best.profit} BRL`)
      }

    }
    else bestCnt = 0
    await db.set('best.count', [bestCnt])

  } catch (error: any) {
    console.log(error.message)
    const data = JSON.parse(error)
    const dateNow = moment(new Date()).tz('America/Bahia').format('YYYY-MM-DD HH:mm')
    console.log(`${dateNow} - [ ${data.module} ] : ${data.erro}`)
    db.push('error', { date: Date.now(), module: data.module, message: data.erro })
  }
}

(async ()=>{

  if (!db.get('best.log')) await db.set('best.log', [])
  if (!db.get('best.count')) await db.set('best.count', [0])

  await db.set('best.count', [0])
  cron.schedule('*/10 * * * * *', () => getData());
  //getData()

  console.log('Profit Switch is running!')
})()
