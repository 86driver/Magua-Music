// import {getData} from './http'

// export function getHotSearch() {
//   const url = '/api/splcloud/fcgi-bin/gethotkey.fcg'
//   const params = {
//     needNewCode: 1
//   }
//   return getData(url, params)
// }

import jsonp from './http'
import { commonParams, options } from './config'

export function getHotSearch() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    needNewCode: 1
  })

  return jsonp(url, data, options)
}