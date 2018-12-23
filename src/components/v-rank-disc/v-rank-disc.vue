<template>
  <transition name="fade">
    <div class="rank-disc">
      <v-music-list
        v-if="musicList"
        :musicList="musicList"
        :bgImage="bgImage"
        :title="title"
        :simpleSong="simpleSong"
        :songList="songList"
        @searchMore="searchMore"></v-music-list>
      <div class="loading-container">
        <v-loading v-show="!musicList"></v-loading>
      </div>
    </div>
  </transition>
</template>
<script>
  import musicList from 'components/v-music-list/v-music-list'
  import {getMusicList} from 'api/musicList'
  import loading from 'base/loading/loading'
  import {getSongVkey} from 'api/songVkey'
  export default {
    name: 'v-rank-disc',
    data () {
      return {
        musicList: null,
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
      this._getMusicList()
    },
    computed: {
      bgImage() {
        return this.musicList.topinfo.pic_album
      },
      title() {
        return this.musicList.topinfo.ListName
      },
      simpleSong() {
        let array = []
        let obj = {}
        this.musicList.songlist.forEach((list) => {
          obj.name = list.data.songname
          obj.singer = list.data.singer
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
        if (this.array.length >= this.musicList.songlist.length) {
          return
        }
        this.begin += this.songNum
        this.finish += this.songNum
        let list = this.musicList.songlist.slice(this.begin, this.finish)
        this._formatSong(list)
      },
      _getMusicList() {
        getMusicList(parseInt(this.$route.params.id)).then((res) => {
          this.musicList = res.data
          let list = this.musicList.songlist.slice(this.begin, this.finish)
          this._formatSong(list)
        })
      },
      _formatSong(list) {
        // let array = []
        let obj = {}
        list.forEach((list, index) => {
          getSongVkey(list.data.songmid).then((res) => {
            this.songVkey = res.data.data.items[0].vkey
            obj.id = list.data.songid
            obj.mid = list.data.songmid
            obj.album = list.data.albummid
            obj.duration = list.data.interval
            obj.name = list.data.songname
            obj.singer = list.data.singer
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
  .rank-disc{
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