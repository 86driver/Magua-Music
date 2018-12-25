// import axios from 'axios'
// import {commonParams} from './config'

// export function getData(url, data) {
//   data = _mergeData(data)
//   url += (url.indexOf('?') < 0 ? '?' : '&') + _param(data)
//   // 在这里统一执行错误处理
//   return axios(url)
//           .catch((error) => {
//             alert('抱歉，出现了一个错误')
//             console.log(error)
//           }) || axios(url)
// }

// function _mergeData(data) { // 合并参数
//   // Object.assign -- 参数1：合并之后，参数2：通用参数， 参数3：有相同的则覆盖第二个参数
//   data = Object.assign({}, commonParams, data)
//   return data
// }

// function _param(data) {
//   let url = ''
//   for (var k in data) {
//     let value = data[k] !== undefined ? data[k] : ''
//     url += '&' + k + '=' + encodeURIComponent(value)
//   }
//   return url ? url.substring(1) : ''
// }

import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
