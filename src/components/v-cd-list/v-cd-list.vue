<template>
  <transition name="fade">
    <div class="cd-list">
      <v-music-list
        v-if="cdList"
        :bgImage="bgImage"
        :title="title"
        :simpleSong="simpleSong"
        :songList="songList"
        @searchMore="searchMore"></v-music-list>
      <div class="loading-container">
        <v-loading v-show="!cdList"></v-loading>
      </div>
    </div>
  </transition>
</template>
<script>
  import loading from 'base/loading/loading'
  import musicList from 'components/v-music-list/v-music-list'
  import {getCdList} from 'api/cdList'
  import {getSongVkey} from 'api/songVkey'
  export default {
    name: 'v-cd-list',
    data () {
      return {
        cdList: null,
        songVkey: null,
        array: [],
        begin: 0,
        songNum: 20,
        finish: 20
      }
    },
    components: {
      'v-music-list': musicList,
      'v-loading': loading
    },
    created() {
      this._getCdList()
    },
    computed: {
      bgImage() {
        return this.cdList.logo
      },
      title() {
        return this.cdList.dissname
      },
      simpleSong() {
        let array = []
        let obj = {}
        this.cdList.songlist.forEach((list) => {
          obj.name = list.title
          obj.singer = list.singer
          array.push(obj)
          obj = []
        })
        return array
      },
      songList() {
        // return this._formatSong()
        return this.array
      }
    },
    methods: {
      searchMore() {
        if (this.array.length >= this.cdList.songlist.length) {
          return
        }
        this.begin += this.songNum
        this.finish += this.songNum
        let list = this.cdList.songlist.slice(this.begin, this.finish)
        this._formatSong(list)
      },
      _getCdList() {
        getCdList(parseInt(this.$route.params.id)).then((res) => {
          // this.cdList = res.data.cdlist[0] 这条用于axios请求
          this.cdList = res.cdlist[0]
          let list = this.cdList.songlist.slice(this.begin, this.finish)
          this._formatSong(list)
        })
      },
      _formatSong(list) {
        // let array = []
        let obj = {}
        list.forEach((list, index) => {
          getSongVkey(list.mid).then(res => {
            // this.songVkey = res.data.data.items[0].vkey 这条用于axios请求
            this.songVkey = res.data.items[0].vkey
            obj.id = list.id
            obj.mid = list.mid
            obj.album = list.album.mid
            obj.duration = list.interval
            obj.name = list.title
            obj.singer = list.singer
            obj.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${obj.album}.jpg?max_age=2592000`
            obj.url = `http://dl.stream.qqmusic.qq.com/C400${obj.mid}.m4a?vkey=${this.songVkey}&guid=7175649092&uin=0&fromtag=66`
            this.array.push(obj)
            obj = []
          })
        })
        // return array
      }
    }
  }
</script>
<style lang='less' scoped>
  .fade-enter-active, .fade-leave-active{
    transition: all 0.3s ease;
  }
  .fade-enter, .fade-leave-to{
    transform: translate3d(100%, 0, 0);
  }
  .cd-list{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(208, 219, 205, 0.8);
  }
  .loading-container{
    position: fixed;
    top: 50%;
    left: 38%;
  }
</style>