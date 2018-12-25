// import { getData } from './http'
// export function getMusicList(topid) {
//   const url = '/api/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
//   const params = {
//     tpl: 3,
//     page: 'detail',
//     needNewCode: 1,
//     type: 'top',
//     topid
//   }
//   return getData(url, params)
// }

import jsonp from './http'
import { commonParams, options } from './config'

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    tpl: 3,
    page: 'detail',
    needNewCode: 1,
    type: 'top',
    topid
  })

  return jsonp(url, data, options)
}