import axios from 'axios'
const uri = "https://api.binance.com/api/v3/ticker/price"

export async function BinanceCoinPrice( coins: any[] ){
  try {
    let coinPrice: { symbol: string; price: number }[] = []

    let coinsList = []
    await coins.map( async cn => {
      let { enable, coin } = cn

      if (!coin.includes('+')) {
        let param = `${uri}?symbol=${coin}USDT`
        console.log(param)
        const result = await axios.get(param)

        console.log(result.data)
      }

    })


    
    //console.log(result.data)
    /*
    result.data.map( mp => {
      if (mp.symbol.includes("USDT")) coinPrice.push({ symbol: mp.symbol, price: mp.price })
    })
*/
    
    return coinPrice
  } catch (error: any) {
    console.log('ERROR:',error.message)
    let msg: string = JSON.stringify({ module: "BinanceCoinPrice", erro: error})
    throw new Error(msg)
  }
}
