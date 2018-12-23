<template>
  <div class="progress-bar-wrapper" @click="changeProgress">
    <div class="progress-bar" ref="progressBar">
      <div class="current-bar" ref="currentProgress"></div>
    </div>
    <div class="control-btn"
      @touchstart.prevent="moveStart"
      @touchmove.prevent="moving"
      @touchend="moveEnd"
      ref="btnBall"></div>
  </div>
</template>
<script>
  export default {
    name: 'progress-bar',
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        startX: 0,
        currentBarWidth: 0,
        moveFlag: false
      }
    },
    components: {},
    mounted() {
      this.progressBar = this.$refs.progressBar
      this.ball = this.$refs.btnBall
      this.currentProgress = this.$refs.currentProgress
    },
    computed: {},
    methods: {
      moveStart(e) {
        this.moveFlag = true
        this.startX = e.touches[0].pageX
        this.left = this.$refs.currentProgress.clientWidth
      },
      moving(e) {
        let moveX = e.touches[0].pageX - this.startX
        let offsetWidth = Math.min(this.progressBar.clientWidth - this.ball.style.width, Math.max(0, this.left + moveX))
        this._offSet(offsetWidth)
      },
      moveEnd() {
        // 拖动触发事件，改变音乐进度
        this.moveFlag = false
        // 这里触发改变歌曲进度事件， 传给父组件
        let percent = this.currentProgress.clientWidth / (this.progressBar.clientWidth - this.ball.clientWidth)
        this.$emit('changePercent', percent)
      },
      changeProgress(e) {
        // 点击触发事件，改变音乐播放进度
        let percent = e.offsetX / this.progressBar.clientWidth
        this.$emit('changePercent', percent)
      },
      _offSet(offsetWidth) {
        this.currentProgress.style.width = offsetWidth + 'px'
        this.ball.style.left = offsetWidth + 'px'
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent > 0 && this.moveFlag === false) {
          let offsetWidth = (this.progressBar.clientWidth - this.ball.clientWidth) * newPercent
          this._offSet(offsetWidth)
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .progress-bar-wrapper{
    width: 100%;
    height: 15px;
    position: relative;
    .progress-bar{
      position: absolute;
      top: 50%;
      left: 0;
      background-color: rgba(238, 238, 238, 0.699);
      width: 100%;
      height: 3px;
      .current-bar{
        height: 100%;
        width: 0;
        background-color: #77d19b;
      }
    }
    .control-btn{
      position: absolute;
      top: 0;
      left: 0;
      width: 15px;
      height: 15px;
      background-color: #77d19b;
      border-radius: 50%;
    }
  }
</style>