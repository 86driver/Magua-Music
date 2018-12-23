import {getData} from './http'

export function getSearchSongs(query, page, perpage) {
  const url = '/search'
  const params = {
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
  }
  return getData(url, params)
}