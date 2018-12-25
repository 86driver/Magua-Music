// import {getData} from './http'

// export function getRecommend() {
//   const url = '/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
//   const params = {
//     needNewCode: 1
//   }
//   return getData(url, params)
// }

import jsonp from './http'
import {commonParams, options} from './config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    needNewCode: 1
  })

  return jsonp(url, data, options)
}