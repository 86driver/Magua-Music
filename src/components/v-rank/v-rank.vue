<template>
  <div class="rank" ref="rank">
    <v-scroll ref="scroll" class="scroll" v-if="topList">
      <ul class="top-list">
        <li v-for="(list, index1) in topList"
          :key=index1
          class="song-list"
          @click="goToChildPage(list.id)">
          <div class="pic">
            <img alt="" class="picUrl" v-lazy="list.picUrl">
            <div class="earcup">
              <img src="./images/earcup.png" alt=""><span>{{list.listenCount | getHot}}</span>
            </div>
          </div>
          <ul class="songs">
            <h1>{{list.topTitle}}</h1>
            <li v-for="(song, index2) in list.songList" :key="index2">
              <i>{{index2 + 1}}</i>
              <span>{{song.songname}} -</span>
              <span>{{song.singername}}</span>
            </li>
            <img src="./images/right.png" alt="" class="right">
          </ul>
        </li>
      </ul>
    </v-scroll>
    <div class="loading-container">
      <v-loading v-show="!topList"></v-loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import {getTopList} from 'api/rank'
  import loading from 'base/loading/loading'
  import {hotFilter} from '../../assets/js/fiter/hot.js'
  import {minilistMixin} from 'assets/js/mixin'
  export default {
    name: 'v-rank',
    mixins: [minilistMixin],
    data () {
      return {
        topList: null
      }
    },
    components: {
      'v-scroll': scroll,
      'v-loading': loading
    },
    created() {
      this._getTopList()
    },
    methods: {
      handlePlaylist(playList) {
        const bottom = playList.length > 0 ? '8vh' : ''
        this.$refs.rank.style.bottom = bottom
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh()
        }
      },
      _getTopList() {
        getTopList().then(res => {
          this.topList = res.data.data.topList
        })
      },
      goToChildPage(topicid) {
        this.$router.push({
          path: `/rank/${topicid}`
        })
      }
    },
    watch: {
      $route (to, from) {
        this.$refs.scroll.refresh()
      }
    },
    filters: {
      getHot(num) {
        return hotFilter(num)
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../assets/less/variable.less';
  @import '../../assets/less/mixin.less';
  .rank{
    position: fixed;
    width: 100%;
    top: 84px;
    bottom: 0;
    .scroll{
      height: 100%;
      overflow: hidden;
      .top-list{
        display: flex;
        flex-direction: column;
        li:last-child{
          padding-bottom: 15px;
        }
        .song-list{
          display: flex;
          flex-direction: row;
          height: 100px;
          padding: 10px 10px 0 10px;
          background-color: #fff;
          .pic{
            position: relative;
            .picUrl{
              width: 100px;
            }
            .earcup{
              position: absolute;
              left: 3px;
              bottom: 5px;
              img{
                width: 20px;
                height: 20px;
                vertical-align: middle;
              }
              span{
                display: inline-block;
                color: rgba(194, 175, 175, 0.637);
                vertical-align: middle;
                font-size: @font-size-small-s;
                margin-top: 3px;
              }
            }
          }
          .songs{
            position: relative;
            flex: 1;
            margin: 10px 0 10px 15px;
            overflow: hidden;
            h1{
              .no-wrap;
            }
            li{
              font-size: @font-size-medium;
              margin-top: 7px;
              .no-wrap;
              i{
                color: rgba(150, 141, 141, 0.795);
                margin-right: 5px;
              }
              :last-child{
                color: rgba(150, 141, 141, 0.795);
              }
            }
            .right{
              position: absolute;
              top: 40%;
              right: 0;
              width: 15px;
              height: 15px;
            }
          }
        }
      }
    }
    .loading-container{
      position: fixed;
      top: 50%;
      left: 38%;
    }
  }
</style>