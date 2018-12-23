<template>
  <div class="recommend" ref="recommend">
    <v-scroll ref="scroll" class="scroll" v-if="recommends">
      <div v-if="recommends">
        <div>
          <wc-swiper v-if="recommends.slider" class="swiper">
            <wc-slide v-for="(item, index) in recommends.slider" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="">
              </a>
            </wc-slide>
          </wc-swiper>
        </div>
        <div class="radio">
          <h1 class="title">电台</h1>
          <song-cover @selectCd="selectSong" :data="recommends.radioList"></song-cover>
        </div>
        <div class="hot-music">
          <h1 class="title">热门歌单</h1>
          <song-cover @selectCd="selectCd" :data="recommends.songList"></song-cover>
        </div>
      </div>
    </v-scroll>
    <div class="loading-container" v-show="!recommends">
      <v-loading></v-loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getRecommend } from 'api/recommend'
  import songCover from 'base/song-cover/song-cover'
  import loading from 'base/loading/loading'
  import scroll from 'base/scroll/scroll'
  import {minilistMixin} from 'assets/js/mixin'
  export default {
    name: 'recommand',
    mixins: [minilistMixin],
    data() {
      return {
        recommends: null
      }
    },
    components: {
      'song-cover': songCover,
      'v-loading': loading,
      'v-scroll': scroll
    },
    created() {
      this._getRecommend()
    },
    methods: {
      handlePlaylist(playList) {
        const bottom = playList.length > 0 ? '8vh' : ''
        this.$refs.recommend.style.bottom = bottom
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh()
        }
      },
      _getRecommend() {
        getRecommend().then(res => {
          this.recommends = res.data.data
        })
      },
      selectCd(data) {
        this.$router.push({
          path: `/recommend/${data.id}`
        })
      },
      selectSong(item) {
        console.log('很难受, 暂时还没找到这个电台的音乐源接口 - -')
      }
    },
    watch: {
      $route (to, from) {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>
<style lang='less' scoped>
  .recommend {
    position: fixed;
    width: 100%;
    top: 84px;
    bottom: 0;
    .scroll{
      height: 100%;
      overflow: hidden;
    }
    .swiper {
      height: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title{
      margin: 1em 0 0 1em;
    }
    .loading-container{
      position: fixed;
      top: 50%;
      left: 38%;
    }
  }
</style>