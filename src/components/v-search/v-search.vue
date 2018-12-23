<template>
  <div class="serach">
    <v-search-box ref="searchBox" @query="onQueryChange"  @deleteText="deleteText"></v-search-box>
    <div class="search-wrapper">
      <div v-show="!query">
        <div class="hot-search">
          <h1>热门搜索</h1>
        </div>
        <ul class="hot-item">
          <li v-for="(item, index) in hotKey" :key="index" @click="selectHotItem(item)">
            {{item.k}}
          </li>
        </ul>
      </div>
      <div class="noResult" v-show="query && !hasMore && !songs.length">抱歉, 暂无搜索结果</div>
      <div class="search-content-wrapper" v-show="query" ref="searchResult">
        <v-scroll class="search-content" ref="scroll"
          :pullup="pullup"
          @scrollToEnd="searchMore">
          <ul>
            <li v-for="(item, index) in songs" :key="index" @click="selectSong(item)">
              <span class="music-icon"><img src="./images/music.png" alt=""></span>
              <span class="text">{{item.songname}}</span>
              <span class="text" v-for="(singer, index) in item.singer" :key="index">
                {{singer.name}} {{(index + 1) === item.singer.length ? '' : '-'}}
              </span>
            </li>
            <div class="loading-container" v-show="hasMore">
              <v-loading title=""></v-loading>
            </div>
          </ul>
        </v-scroll>
      </div>
    </div>
  </div>
</template>
<script>
  import searchBox from 'base/search-box/search-box'
  import scroll from 'base/scroll/scroll'
  import {getHotSearch} from 'api/hotSearch'
  import {getSearchSongs} from 'api/getSearchSongs'
  import loading from 'base/loading/loading'
  import {getSongVkey} from 'api/songVkey'
  import {mapActions} from 'vuex'
  import {minilistMixin} from 'assets/js/mixin'
  export default {
    name: 'v-search',
    mixins: [minilistMixin],
    data () {
      return {
        hotKey: null,
        query: null,
        songs: '',
        hasMore: false,
        array: [],
        songVkey: null,
        page: 1,
        num: 20,
        pullup: true
      }
    },
    components: {
      'v-search-box': searchBox,
      'v-scroll': scroll,
      'v-loading': loading
    },
    created() {
      this._getHotSearch()
    },
    computed: {},
    watch: {
      query(newQuery) {
        if (newQuery !== '') {
          // 如果query为空（即删除搜索内容时）不触发请求事件
          this._getSearchSongs()
        }
      }
    },
    methods: {
      handlePlaylist(playList) {
        const bottom = playList.length > 0 ? '8vh' : ''
        this.$refs.searchResult.style.bottom = bottom
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh()
        }
      },
      onQueryChange(query) {
        this.query = query
      },
      selectHotItem(item) {
        this.$refs.searchBox.text = item.k
      },
      selectSong(song) {
        this._formatSong(song)
      },
      searchMore() {
        this.page++
        this.hasMore = true
        getSearchSongs(this.query, this.page, this.num).then((res) => {
          this.songs = this.songs.concat(res.data.data.song.list)
          this._checkMore(res.data.data)
        })
      },
      deleteText() {
        this.$refs.searchBox.text = ''
      },
      _formatSong(song) {
        // let array = []
        let obj = {}
        this.array = [] // 选择歌曲时先把上一首歌曲清空
        getSongVkey(song.songmid).then(res => {
          this.songVkey = res.data.data.items[0].vkey
          obj.id = song.songid
          obj.mid = song.songmid
          obj.album = song.albummid
          obj.duration = song.interval
          obj.name = song.songname
          obj.singer = song.singer
          obj.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${obj.album}.jpg?max_age=2592000`
          obj.url = `http://dl.stream.qqmusic.qq.com/C400${obj.mid}.m4a?vkey=${this.songVkey}&guid=7175649092&uin=0&fromtag=66`
          this.array.push(obj)
          obj = []
          this.loopSong({list: this.array})
        })
        // return array
      },
      _getHotSearch() {
        getHotSearch().then(res => {
          // 取前五条数据
          this.hotKey = res.data.data.hotkey.slice(0, 5)
        })
      },
      _getSearchSongs() {
        this.hasMore = true
        this.songs = [] // 重置搜索结果数组
        getSearchSongs(this.query, this.page, this.num).then((res) => {
          this.songs = res.data.data.song.list
          this._checkMore(res.data.data)
        })
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * this.page) > song.totalnum) {
          this.hasMore = false
        }
      },
      ...mapActions([
        'loopSong'
      ])
    }
  }
</script>
<style lang='less' scoped>
  @import '../../assets/less/mixin.less';
  .serach{
    color: rgb(7, 17, 27);
    .search-wrapper{
      height: 100%;
      background-color: #fff;
      margin: 0 auto;
      .hot-search{
        padding: 0 5%;
        h1{
          padding-top: 2vh;
          font-size: 18px;
        }
      }
      .hot-item{
        padding: 0 5%;
        margin-top: 2vh;
        li{
          .no-wrap();
          text-align: center;
          max-width: 30vw;
          margin: 2vw;
          color: rgb(219, 215, 209);
          display: inline-block;
          padding: 2vw;
          border-radius: 5px;
          background-color: rgba(7, 17, 27, 0.5);
          &:active{
            color: #77d19b;
          }
        }
      }
      .search-content-wrapper{
        position: fixed;
        top: 84px;
        bottom: 0;
        width: 100%;
        .search-content{
          background-color: #fff;
          overflow: hidden;
          position: absolute;
          top: 8vh;
          bottom: 0;
          width: 100%;
          padding: 0 5%;
          ul{
            li{
              width: 90%;
              padding: 1.5vh 0;
              .no-wrap();
              .music-icon{
                display: inline-block;
                width: 8vw;
                height: 8vw;
                img{
                  width: 100%;
                  height: 100%;
                  vertical-align: middle;
                }
              }
              .text{
                padding-left: 3vw;
                vertical-align: middle;
              }
            }
            .loading-container{
              width: 90%;
              text-align: center;
            }
          }
        }
      }
    }
    .noResult{
      z-index: 50;
      position: fixed;
      top: 50%;
      left: 30%;
    }
    // .loading-container{
    //   position: fixed;
    //   top: 50%;
    //   left: 38%;
    // }
  }
</style>