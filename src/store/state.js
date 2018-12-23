import {playMode} from 'assets/js/config.js'
const state = {
  playing: false,
  playList: [],
  mode: playMode.sequence,
  sequenceList: [],
  currentIndex: -1,
  fullScreen: false
}

export default state