export const playing = state => state.playing
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const currentIndex = state => state.currentIndex
export const mode = state => state.mode
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
export const fullScreen = state => state.fullScreen