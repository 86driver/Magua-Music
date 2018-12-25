// import { getData } from './http'

// export function getLyrics(id) {
//   const url = '/getLyrics'
//   const params = {
//     needNewCode: 1,
//     nobase64: 1,
//     musicid: id,
//     songtype: 0
//   }
//   return getData(url, params)
// }

import {commonParams} from './config'
import axios from 'axios'

export function getLyrics(id) {
  const url = '/getLyrics'
  const data = Object.assign({}, commonParams, {
    needNewCode: 1,
    nobase64: 1,
    musicid: id,
    songtype: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}