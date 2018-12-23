// 格式化当前播放进度==> x:xx
function currentTimeFormat(currentTime) {
  let minite = Math.floor(currentTime / 60)
  let seconds = Math.floor(currentTime % 60)
  seconds = _commomSeconds(seconds)
  return `${minite}:${seconds}`
}

// 格式化播放总时长==> x:xx
function durationTimeFormat(duration) {
  let minite = Math.floor(duration / 60)
  let seconds = Math.floor(duration % 60)
  seconds = _commomSeconds(seconds)
  return `${minite}:${seconds}`
}

function _commomSeconds(seconds) {
  if (seconds.toString().length === 1) {
    seconds = `0${seconds}`
  }
  return seconds
}

export {currentTimeFormat, durationTimeFormat}