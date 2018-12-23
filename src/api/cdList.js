import { getData } from './http'
export function getCdList(disstid) {
  const url = '/getCdList'
  const params = {
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
  }
  return getData(url, params)
}