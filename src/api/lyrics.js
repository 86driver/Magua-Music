import { getData } from './http'

export function getLyrics(id) {
  const url = '/getLyrics'
  const params = {
    needNewCode: 1,
    nobase64: 1,
    musicid: id,
    songtype: 0
  }
  return getData(url, params)
}