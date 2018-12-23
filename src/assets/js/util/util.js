// 截取接口返回jsonp格式数据转化为json对象
// 本项目中没用到
export function parseJson(res) {
  let reg = /\{[\w\W]*\}/ // 匹配字符串中最外层{}(包括{}本身)的内容
  reg = res.match(reg)[0]
  const data = JSON.parse(reg)
  return data
}

// 打乱数组
export function shuffle(arr) {
  let _arr = arr.slice() // 因为arr数组只有一层， 所以这里用slice来进行浅拷贝
  _arr = _arr.sort(() => Math.random() - 0.5)
  return _arr
}

// 去抖
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}