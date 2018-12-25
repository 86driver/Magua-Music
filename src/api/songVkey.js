// import { getData } from './http'
// export function getSongVkey(mid) {
//   const url = '/api/base/fcgi-bin/fcg_music_express_mobile3.fcg'
//   const params = {
//     songmid: mid,
//     filename: `C400${mid}.m4a`,
//     guid: 7175649092,
//     platform: 'yqq',
//     loginUin: 0,
//     hostUin: 0,
//     needNewCode: 0,
//     cid: 205361747,
//     uid: 0
//   }
//   return getData(url, params)
// }

import jsonp from './http'
import { commonParams, options } from './config'

export function getSongVkey(mid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    filename: `C400${mid}.m4a`,
    guid: 7175649092,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    uid: 0
  })

  return jsonp(url, data, options)
}