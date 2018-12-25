// import { getData } from './http'
// export function getCdList(disstid) {
//   const url = '/getCdList'
//   const params = {
//     needNewCode: 1,
//     new_format: 1,
//     pic: 500,
//     type: 1,
//     json: 1,
//     utf8: 1,
//     onlysong: 0,
//     picmid: 1,
//     nosign: 1,
//     disstid
//   }
//   return getData(url, params)
// }

import { commonParams } from './config'
import axios from 'axios'

export function getCdList(disstid) {
  const url = '/getCdList'

  const data = Object.assign({}, commonParams, {
    needNewCode: 1,
    new_format: 1,
    pic: 500,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    picmid: 1,
    nosign: 1,
    disstid
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}