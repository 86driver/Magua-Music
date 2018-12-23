import { getData } from './http'
export function getTopList() {
  const url = '/api/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const params = {
    needNewCode: 1
  }
  return getData(url, params)
}