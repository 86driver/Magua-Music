// import { getData } from './http'
// export function getTopList() {
//   const url = '/api/v8/fcg-bin/fcg_myqq_toplist.fcg'
//   const params = {
//     needNewCode: 1
//   }
//   return getData(url, params)
// }

import jsonp from './http'
import { commonParams, options } from './config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    needNewCode: 1
  })

  return jsonp(url, data, options)
}