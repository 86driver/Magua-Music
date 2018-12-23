import {mapGetters, mapMutations} from 'vuex'
import {playMode} from 'assets/js/config'
import {shuffle} from 'assets/js/util/util'

export const playerMixin = {
  computed: {
    ...mapGetters([
      'sequenceList',
      'playList',
      'currentSong',
      'mode'
    ])
  },
  methods: {
    changePlayMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this._resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    _resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  }
}

export const minilistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playList)
  },
  methods: {
    handlePlaylist() {
      console.log('调用了minilistMixin的话记得在组件方法中写入handlePlaylist方法')
    }
  },
  watch: {
    playList(newVal) {
      this.handlePlaylist(newVal)
    }
  }
}