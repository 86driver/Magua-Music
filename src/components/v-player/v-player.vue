<template>
  <div class="player" v-show="playList.length > 0">
    <transition name="fullScreen">
      <div class="full-player" v-show="fullScreen">
        <v-back @back="back" class="back" ref="back"></v-back>
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image" alt="">
        </div>
        <div class="top">
          <div class="name">{{currentSong.name}}</div>
          <div class="singer">
            <span v-for="(item, index) in currentSong.singer" :key="index">
              {{item.name}} {{(index + 1) === currentSong.singer.length ? '' : '-'}}
            </span>
          </div>
        </div>
        <div class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper">
              <span class="cd" :class="ifRotate">
                <img :src="currentSong.image" alt="">
              </span>
            </div>
            <div class="simple-lyric">
              <div class="simple-lyric-wrapper">
                <div>{{playinglyric}}</div>
              </div>
            </div>
          </div>
          <v-scroll class="middle-r" ref="middleR">
            <div class="lyric-wrapper">
              <div v-if="lyrics">
                <p class="text" v-for="(item, index) in lyrics.lines" :key=index
                  ref="lyricLine"
                  :class="{'current': currentLineNum === index}">
                  {{item.txt}}
                </p>
              </div>
            </div>
          </v-scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <div class="dot-1" :class="{'active-dot': currentShow === 'cd'}"></div>
            <div class="dot-2" :class="{'active-dot': currentShow === 'lyric'}"></div>
          </div>
          <div class="progress-bar-container">
            <div>{{currentTime | currentTime}}</div>
            <v-progress-bar
              class="progress-bar"
              :percent="percent"
              @changePercent="onchangePercent"></v-progress-bar>
            <div>{{currentSong.duration | durationTime}}</div>
          </div>
          <div class="icon-wrapper">
            <span class="icon icon-l" @click="changePlayMode">
              <img :src="require('./images/'+changeMode+'.png')" alt="">
            </span>
            <span class="icon icon-l" @click="preSong">
              <img src="./images/pre.png" alt="">
            </span>
            <span class="icon icon-center" @click="togglePlay">
              <img :src="require('./images/'+playIcon+'.png')" alt="">
            </span>
            <span class="icon icon-r" @click="nextSong">
              <img src="./images/next.png" alt="">
            </span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="miniScreen">
      <div class="mini-player" v-show="!fullScreen" @click="openFullScreen">
        <div class="mini-player-wrapper">
          <div class="avatar" :class="ifRotate">
            <img :src="currentSong.image" alt="">
          </div>
          <div class="song">
            <div class="song-name">{{currentSong.name}}</div>
            <div class="singer">
              <span v-for="(item, index) in currentSong.singer" :key="index">
                {{item.name}} {{(index + 1) === currentSong.singer.length ? '' : '-'}}
              </span>
            </div>
          </div>
          <div class="mini-playIcon" @click.stop="togglePlay" ref="progressCircle">
            <v-progress-circle :percent="percent" :radius="32">
              <img :src="require('./images/'+miniPlayIcon+'.png')" alt="">
            </v-progress-circle>
          </div>
          <div class="mini-musiclist" @click.stop="toggleMinilist">
            <img src="./images/material.png" alt="">
          </div>
        </div>
      </div>
    </transition>
    <v-mini-songlist ref="miniSonglist"></v-mini-songlist>
    <audio
      ref="audio"
      autoplay
      :src="currentSong.url"
      @ended="end"
      @error="error"
      @timeupdate="updateTime"></audio>
  </div>
</template>
<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import back from 'base/back/back'
  // import {parseJson} from 'assets/js/util/util'
  import {playMode} from 'assets/js/config'
  import progressBar from 'base/progress-bar/progress-bar'
  import {currentTimeFormat, durationTimeFormat} from 'assets/js/fiter/audioTime'
  import {getLyrics} from 'api/lyrics'
  import Lyric from 'lyric-parser'
  import scroll from 'base/scroll/scroll'
  import progressCircle from 'base/progress-circle/progress-circle'
  import songlist from 'components/v-mini-songlist/v-mini-songlist'
  import {playerMixin} from 'assets/js/mixin'
  export default {
    name: 'v-player',
    mixins: [playerMixin],
    data () {
      return {
        currentTime: 0,
        lyrics: null,
        playinglyric: '',
        touch: {},
        currentShow: 'cd',
        currentLineNum: 0,
        radius: 0
      }
    },
    components: {
      'v-back': back,
      'v-progress-bar': progressBar,
      'v-scroll': scroll,
      'v-progress-circle': progressCircle,
      'v-mini-songlist': songlist
    },
    mounted() {
      this.rotateBackImg()
      // 初始化歌词的位置
      this.$refs.middleR.$el.style.paddingLeft = `${window.innerWidth}px`
    },
    computed: {
      ifRotate() {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon() {
        return this.playing === true ? 'pause' : 'play'
      },
      miniPlayIcon() {
        return this.playing === true ? 'minipause' : 'miniplay'
      },
      changeMode() {
        if (this.mode === 0) {
          return 'sequence'
        } else if (this.mode === 1) {
          return 'loop'
        } else {
          return 'random'
        }
      },
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      ...mapGetters([
        'currentIndex',
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'mode',
        'sequenceList'
      ])
    },
    methods: {
      back() {
        this.setFullScreen(false)
      },
      openFullScreen() {
        this.setFullScreen(true)
      },
      rotateBackImg() {
        this.$refs.back.$el.querySelector('img').style.transform = 'rotate(-90deg)'
      },
      preSong() {
        // 如果歌曲列表长度为1时执行单曲循环逻辑
        if (this.mode === playMode.loop || this.playList.length === 1) {
          // 当处理单曲循环的时候，点击切换重新加载音乐
          this.$refs.audio.load()
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
      },
      togglePlay() {
        this.setPlayState(!this.playing)
        if (this.lyrics) {
          this.lyrics.togglePlay()
        }
      },
      nextSong() {
        // 如果歌曲列表长度为1时执行单曲循环逻辑
        if (this.mode === playMode.loop || this.playList.length === 1) {
          // 当处理单曲循环的时候，点击切换重新加载音乐
          this.$refs.audio.load()
          return
        }
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
      },
      end() {
        this.nextSong()
      },
      error() {
        // 当前音乐出错跳转到下一首歌曲
        this.nextSong()
      },
      // collect() {
      //   console.log('收藏这首歌曲')
      // },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      onchangePercent(percent) {
        this.$refs.audio.currentTime = this.currentSong.duration * percent
        if (this.playing === false) {
          this.togglePlay()
        }
        if (this.lyrics) {
          this.lyrics.seek(this.$refs.audio.currentTime * 1000)
        }
      },
      middleTouchStart(e) {
        this.touch.xpos = e.touches[0].pageX
        this.touch.ypos = e.touches[0].pageY
      },
      middleTouchMove(e) {
        let touch = e.touches[0]
        let deltaX = touch.pageX - this.touch.xpos
        let deltaY = touch.pageY - this.touch.ypos
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return 0
        }
        let left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        let offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        this.$refs.middleR.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.middleR.$el.style.transitionDuration = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style.transitionDuration = 0
      },
      middleTouchEnd(e) {
        let offsetWidth
        let opacity
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.2) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.currentShow = 'lyric'
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent < 0.8) {
            offsetWidth = 0
            this.currentShow = 'cd'
            opacity = 1
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300
        this.$refs.middleR.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.middleR.$el.style.transitionDuration = `${time}ms`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style.transitionDuration = `${time}ms`
      },
      toggleMinilist() {
        this.$refs.miniSonglist.show()
      },
      _getLyrics(id) {
        getLyrics(id).then((res) => {
          if (!res.data.lyric) {
            return
          }
          this.lyrics = new Lyric(res.data.lyric, ({lineNum, txt}) => {
            this.playinglyric = txt
            this.currentLineNum = lineNum
            if (lineNum > 5) {
              let lineEl = this.$refs.lyricLine[lineNum - 3]
              this.$refs.middleR.scrollToElement(lineEl, 1000)
            } else {
              this.$refs.middleR.scrollTo(0, 0, 1000)
            }
          })
          if (this.playing) {
            this.lyrics.play()
          }
        })
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayState: 'SET_PLAYING_STATE'
      }),
      ...mapActions([
        'selectPlay'
      ])
    },
    filters: {
      durationTime(duration) {
        return durationTimeFormat(duration)
      },
      currentTime(currentTime) {
        return currentTimeFormat(currentTime)
      }
    },
    watch: {
      currentSong(newSong) {
        if (this.lyrics) {
          // 如果切换歌曲则把上一首歌的歌词停止
          this.lyrics.stop()
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLineNum = 0
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this._getLyrics(newSong.id)
        }, 1000)
      },
      playing(newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../assets/less/mixin.less';
  .fullScreen-enter-active, .fullScreen-leave-active{
    opacity: 1;
    transition: all 0.4s ease;
  }
  .fullScreen-enter, .fullScreen-leave-to{
    opacity: 0;
    transform: translate3d(0, 100% ,0);
  }
  .miniScreen-enter-active, .miniScreen-leave-active{
    opacity: 1;
    transition: all 0.4s ease;
  }
  .miniScreen-enter, .miniScreen-leave-to{
    opacity: 0;
    transform: translate3d(0, 100% ,0);
  }
  @keyframes rotate{
    from{
      transform: rotate(0deg);
      }
    to{
      transform: rotate(360deg)
      }
  }
  .player{
    color: #fff;
    .full-player{
      z-index: 50;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgb(7,17,27);
      .background{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(30px);
      }
      .top{
        position: absolute;
        width: 100%;
        top: 45px;
        left: 0;
        text-align: center;
        .name{
          .no-wrap;
          font-size: 20px;
        }
        .singer{
          .no-wrap;
          margin-top: 3vw;
          font-size: 16px;
        }
      }
      .middle{
        width: 100%;
        position: absolute;
        top: 20%;
        bottom: 30%;
        .middle-l{
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper{
            position: absolute;
            top: 0;
            left: 10%;
            height: 100%;
            width: 80%;
            .cd{
              position: absolute;
              width: 100%;
              height: 100%;
              &.play{
                animation: rotate 20s linear infinite;
              }
              &.pause{
                animation-play-state: paused;
              }
              img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                box-sizing: border-box;
                border: 10px solid rgba(255, 255, 255, 0.1);
              }
            }
          }
          .simple-lyric{
            width: 100%;
            position: absolute;
            bottom: -5vh;
            left: 0;
            .simple-lyric-wrapper{
              display: flex;
              justify-content: center;
              color: #77d19b;
            }
          }
        }
        .middle-r{
          overflow: hidden;
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          text-align: center;
          .text{
            padding-top: 3vh;
          }
          .current{
            color: #77d19b;
          }
        }
      }
      .bottom{
        position: absolute;
        left: 0;
        bottom: 8.5%;
        width: 100%;
        text-align: center;
        .dot-wrapper{
          width: 100%;
          position: absolute;
          left: 0;
          top: -7vw;
          display: flex;
          justify-content: center;
          .dot-1,.dot-2{
            background-color: rgba(238, 238, 238, 0.582);
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }
          .dot-1{
            margin-right: 2vw;
          }
        }
        .active-dot{
          background: #77d19b !important;
        }
        .progress-bar-container{
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-bottom: 10vw;
          .progress-bar{
            width: 70%;
          }
        }
        .icon-wrapper{
          .icon{
            display: inline-block;
            width: 10vw;
            height: 10vw;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .icon-l{
            padding-left: 5%;
          }
          .icon-center{
            width: 10vw;
            height: 10vw;
            padding: 0 5%;
          }
          .icon-r{
            padding-right: 5%;
          }
        }
      }
    }
    .mini-player{
      z-index: 10;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 8vh;
      border-top: solid 1px rgba(194, 189, 189, 0.658);
      background-color: #fff;
      color: #000;
      .mini-player-wrapper{
        display: flex;
        padding: 0 3vw;
        height: 8vh;
        align-items: center;
        .avatar{
          width: 10.67vw;
          height: 6vh;
          &.play{
            animation: rotate 20s linear infinite;
          }
          &.pause{
            animation-play-state: paused;
          }
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .song{
          padding-left: 3vw;
          font-size: 14px;
          width: 65%;
          .song-name{
            .no-wrap;
            color: #1d1a1a;
          }
          .singer{
            padding-top: 1vh;
            .no-wrap;
            color: #777;
          }
        }
        .mini-playIcon{
          font-size: 0;
          img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
        .mini-musiclist{
          padding-left: 2vw;
          width: 8vw;
          height: 8vw;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .back{
      z-index: 10;
    }
  }
</style>