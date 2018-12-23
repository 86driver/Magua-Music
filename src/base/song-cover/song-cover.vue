<template>
  <div class="song-cover" v-if="data">
    <div v-for="(item, index) in data" :key="index" class="item">
      <div class="pic-cover" @click="selectCd(item)">
        <img :src="item.picUrl" alt="">
        <div v-if="item.accessnum" class="earcup">
          <img src="../../assets/images/earcup.png" alt="">
          <span>{{item.accessnum | getHot}}</span>
        </div>
        <div class="play">
          <img src="../../assets/images/play.png" alt="">
        </div>
      </div>
      <div class="no-wrap text" v-if="item.Ftitle">{{item.Ftitle}}</div>
      <div class="no-wrap text" v-if="item.songListDesc">{{item.songListDesc}}</div>
      <div class="no-wrap text font12"
        v-if="item.songListAuthor">{{item.songListAuthor}}</div>
    </div>
  </div>
</template>

<script>
  import {hotFilter} from '../../assets/js/fiter/hot.js'
  export default {
    name: 'song-cover',
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    filters: {
      getHot(num) {
        return hotFilter(num)
      }
    },
    methods: {
      selectCd(item) {
        this.$emit('selectCd', item)
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../assets/less/variable.less';
  @import '../../assets/less/mixin.less';
  .song-cover{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1em;
    .item{
      background-color: @conponent-bg-color;
      width: 47%;
      margin-top: 1em;
      .pic-cover{
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .play, .earcup{
          position: absolute;
          bottom: 10px;
          font-size: 12px;
          img{
            width: 24px;
            height: 24px;
            vertical-align: middle;
          }
        }
        .play{
          right: 5px;
        }
        .earcup{
          left: 5px;
          color: #fff;
          span{
            vertical-align: middle;
          }
        }
      }
      .text{
        font-size: 14px;
        padding: 0.3em;
      }
      .no-wrap{
        .no-wrap();
      }
      .font12{
        font-size: 12px;
      }
    }
  }
</style>