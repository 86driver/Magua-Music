<template>
  <transition name="mini-songlist">
    <div v-if="showFlag" class="mini-songlist" @click="hide">
      <div class="mini-songlist-wrapper" @click.stop>
        <div class="title-wrapper">
          <div class="title">
            <div class="icon" @click="changePlayMode">
              <img :src="require('./images/'+changeMode+'.png')" alt="">
              <span class="text">{{modeText}}</span>
            </div>
            <div class="icon" @click='clearAll'>
              <img src="./images/delete.png" alt="">
            </div>
          </div>
          <v-scroll class="minilist">
            <v-songlist :songList='sequenceList' @selectSong="selectSong"></v-songlist>
          </v-scroll>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {mapActions, mapMutations} from 'vuex'
  import scroll from 'base/scroll/scroll'
  import {playerMixin} from 'assets/js/mixin'
  import songlist from 'components/v-song-list/v-song-list'
  import {playMode} from 'assets/js/config'
  export default {
    mixins: [playerMixin],
    name: 'mini-songlist',
    data () {
      return {
        showFlag: false,
        modeIndex: 0
      }
    },
    components: {
      'v-scroll': scroll,
      'v-songlist': songlist
    },
    computed: {
      changeMode() {
        if (this.mode === 0) {
          return 'sequence'
        } else if (this.mode === 1) {
          return 'loop'
        } else {
          return 'random'
        }
      },
      modeText() {
        if (this.mode === 0) {
          return '顺序播放'
        } else if (this.mode === 1) {
          return '单曲循环'
        } else {
          return '随机播放'
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      clearAll() {
        this.deleteSongList()
        this.hide()
      },
      selectSong(index, item) {
        if (this.mode === playMode.random) {
          index = this.playList.findIndex((song) => {
            return song.id === item.id
          })
        }
        this.setCurrentIndex(index)
        this.setFullScreen(true)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      }),
      ...mapActions([
        'deleteSongList'
      ])
    }
  }
</script>
<style lang='less' scoped>
  .mini-songlist-enter-active,.mini-songlist-leave-active{
    transition: opacity 0.3s;
    .mini-songlist-wrapper{
      transition: all 0.3s;
    }
  }
  .mini-songlist-enter,.mini-songlist-leave-to{
    opacity: 0;
    .mini-songlist-wrapper{
      transform: translate3d(0, 100%, 0);
    }
  }
  .mini-songlist{
    z-index: 30;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(7,17,27,0.4);
    .mini-songlist-wrapper{
      position: absolute;
      left: 0;
      top: 30%;
      bottom: 0;
      width: 100%;
      color: rgb(7, 17, 27);
      background-color: #fff;
      .title-wrapper{
        padding-top: 2vh;
        width: 90%;
        margin: 0 auto;
        .title{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .icon{
            img{
              vertical-align: middle;
              width: 8vw;
              height: 8vw;
            }
          }
          .text{
            display: inline-block;
            line-height: 8vw;
            vertical-align: middle;
          }
        }
      }
      .minilist{
        position: absolute;
        overflow: hidden;
        left: 0;
        top: 12%;
        bottom: 0;
        width: 100%;
      }
    }
  }
</style>