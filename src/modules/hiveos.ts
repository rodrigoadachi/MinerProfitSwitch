import axios from 'axios'

import { hiveos } from '../../config.json'
const { farmId, workerId, token } = hiveos

const instance = axios.create({
  baseURL: `https://api2.hiveos.farm/api/v2/farms/${farmId}`
})

instance.defaults.headers.common['content-type'] = 'application/json'
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

export async function HiveOsSetFlightSheet(fsName: string){
  try {
    
    if (!fsName) throw new Error('Need to insert the Flight Sheet')

    const HiveOsFs = await HiveOsGetFlightSheet()

    const _fs = HiveOsFs.find( (el: {
      name: any, id: string 
      }) => el.name === fsName )
    console.log
    const result = await instance.patch(`/workers/${workerId}`, { fs_id: _fs.id })
    
    return result.data
  } catch (error: any) {
    let msg: string = JSON.stringify({ module: "HiveOsSetFlightSheet", erro: error})
    throw new Error(msg)
  }
}

export async function HiveOsGetFlightSheet(){
  try {

    const result = await instance.get('/fs')
    return result.data.data
  } catch (error: any) {
    let msg: string = JSON.stringify({ module: "HiveOsGetFlightSheet", erro: error})
    throw new Error(msg)
  }
}

export async function HiveOsGetWorker(){
  try {

    const result = await instance.get(`/workers/${workerId}`)
    return result.data
  } catch (error: any) {
    let msg: string = JSON.stringify({ module: "HiveOsGetWorker", erro: error})
    throw new Error(msg)
  }
}

