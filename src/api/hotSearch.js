import {getData} from './http'

export function getHotSearch() {
  const url = '/api/splcloud/fcgi-bin/gethotkey.fcg'
  const params = {
    needNewCode: 1
  }
  return getData(url, params)
}