// import {getData} from './http'

// export function getSearchSongs(query, page, perpage) {
//   const url = '/search'
//   const params = {
//     w: query,
//     p: page,
//     perpage,
//     n: perpage,
//     catZhida: 0,
//     zhidaqu: 0,
//     t: 0,
//     flag: 1,
//     ie: 'utf-8',
//     sem: 1,
//     aggr: 0,
//     remoteplace: 'txt.mqq.all',
//     needNewCode: 1
//   }
//   return getData(url, params)
// }

import jsonp from './http'
import { commonParams, options } from './config'

export function getSearchSongs(query, page, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: 0,
    zhidaqu: 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}