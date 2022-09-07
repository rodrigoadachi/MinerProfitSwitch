import axios from 'axios'
const uri = "https://api.minerstat.com/v2/coins?list="

export async function GetCoin( coins: any[] ){
  try {
    
    let coinsList = ''
    
    await coins.map( cn => {
      let { enable, coin } = cn

      coinsList += coin+','
      if (enable) coinsList += ''
    })

    coinsList = coinsList.slice(0, -1)

    const result = await axios.get(`${uri}${coinsList}`)

    return result.data
  } catch (error: any) {
    let msg: string = JSON.stringify({ module: "GetCoin", erro: error})
    throw new Error(msg)
  }
}
