import axios from 'axios'

const uri = "https://economia.awesomeapi.com.br/json/last/"

export async function GetQuote( coin: string){
  try {
    
    if (!coin) throw new Error('It is necessary to inform the currencies')

    const result = await axios.get(`${uri}${coin}`)
    return result.data
  } catch (error: any) {
    let msg: string = JSON.stringify({ module: "GetQuote", erro: error})
    throw new Error(msg)
  }
}

