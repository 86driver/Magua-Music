<template>
  <div class="music-list">
    <v-back @back="back" class="back"></v-back>
    <v-music-cover
      :bg="bgImage"
      :title="title"
      @randomPlay="random"
      ref="musicCover">
    </v-music-cover>
    <div class="bg-layer" ref="layer"></div>
    <v-scroll class="scroll"
      :listen-scroll="true"
      :probe-type="3"
      @scroll="scroll"
      :pullup="pullup"
      @scrollToEnd="searchMore"
      ref="scroll">
      <v-song-list
        @selectSong="selectSong"
        :simpleSong="simpleSong"
        :songList="songList"
        class="song-list">
      </v-song-list>
    </v-scroll>
  </div>
</template>
<script>
  import scroll from 'base/scroll/scroll'
  import back from 'base/back/back'
  import musicCover from 'components/v-music-cover/v-music-cover'
  import songList from 'components/v-song-list/v-song-list'
  import {mapActions, mapMutations} from 'vuex'
  // import loading from 'base/loading/loading'
  import {minilistMixin} from 'assets/js/mixin'
  export default {
    name: 'v-music-list',
    mixins: [minilistMixin],
    props: {
      bgImage: {
        type: String
      },
      title: {
        type: String
      },
      simpleSong: {
        type: Array
      },
      songList: {
        type: Array
      }
    },
    data () {
      return {
        scrollY: 0,
        pullup: true
      }
    },
    components: {
      'v-scroll': scroll,
      'v-back': back,
      'v-music-cover': musicCover,
      'v-song-list': songList
      // 'v-loading': loading
    },
    mounted() {
      this.coverHeight = this.$refs.musicCover.$el.clientHeight
      this.minTransalteY = -this.coverHeight + 50
    },
    methods: {
      searchMore() {
        this.$emit('searchMore')
        // 搜一次刷新一次scroll高度
        this.$refs.scroll.refresh()
      },
      handlePlaylist(playList) {
        const bottom = playList.length > 0 ? '8vh' : ''
        this.$refs.scroll.$el.style.bottom = bottom
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh()
        }
      },
      back() {
        this.$router.back()
      },
      random() {
        this.randomPlay({
          list: this.songList
        })
      },
      selectSong(index) {
        this.selectPlay({
          list: this.songList,
          index
        })
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ]),
      ...mapMutations({
        setPlayMode: 'SET_PLAY_MODE'
      })
    },
    watch: {
      scrollY(newY, oldY) {
        let zIndex = 0
        let translateY = Math.max(newY, this.minTransalteY)
        this.$refs.layer.style.transform = `translate3d(0,${translateY}px,0)`
        if (newY < this.minTransalteY) {
          this.$refs.musicCover.$el.querySelector('.play').style.display = 'none'
          this.$refs.musicCover.$el.style.height = '50px'
          zIndex = 2
        } else {
          this.$refs.musicCover.$el.querySelector('.play').style.display = ''
          this.$refs.musicCover.$el.style.height = '40vh'
          zIndex = 0
        }
        this.$refs.musicCover.$el.style.zIndex = zIndex
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../assets/less/variable.less';
  .music-list{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    .back{
      z-index: 3;
    }
    .bg-layer{
      position: relative;
      height: 100%;
      background-color: #fff;
      transform: translate3d(0,0px,0);
    }
    .scroll{
      position: fixed;
      top: 40vh;
      bottom: 0;
      width: 100%;
    }
  }
</style>