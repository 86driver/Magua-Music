// 热度
export function hotFilter(num) {
  if (num / 10000 < 0) {
    return num
  } else {
    const num1 = (num / 10000).toFixed(1)
    return `${num1}万`
  }
}