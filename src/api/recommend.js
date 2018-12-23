import {getData} from './http'

export function getRecommend() {
  const url = '/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const params = {
    needNewCode: 1
  }
  return getData(url, params)
}