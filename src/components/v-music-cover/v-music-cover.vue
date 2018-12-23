<template>
  <div class="music-cover" v-lazy:background-image="bg">
    <div class="filter">
      <p class="title">{{title}}</p>
      <div class="play" @click="randomPlay">
        <img src="./images/play.png" alt="">
        <span>随机播放全部</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'v-music-cover',
    props: {
      title: {
        type: String
      },
      bg: {
        type: String
      }
    },
    data () {
      return {
      }
    },
    components: {},
    methods: {
      randomPlay() {
        this.$emit('randomPlay')
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../assets/less/variable.less';
  .music-cover{
    position: relative;
    width: 100%;
    height: 40vh;
    background-repeat: no-repeat;
    background-size:cover;
    .filter{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7,17,27,0.4);
      color: #fff;
      .title{
        width: 100%;
        text-align: center;
        padding-top: 2.5vh;
      }
      .play{
        position: absolute;
        left: 31%;
        bottom: 2vh;
        box-sizing: border-box;
        border-radius: 15vh;
        padding: 0.2vh 1vh;
        border: 0.15vh solid rgba(7,17,27,0.1);
        background-color: rgba(7,17,27,0.7);
        font-size: @font-size-medium;
        img{
          width: 5vh;
          height: 5vh;
          vertical-align: middle;
        }
        span{
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
</style>