<template>
  <div :style="myStyle" @click="back">
    <img src="./images/left.png" alt="">
  </div>
</template>
<script>
  export default {
    name: 'back',
    props: {
      myPosition: {
        type: String,
        default: 'fixed'
      },
      myPadding: {
        type: [Number, String],
        default: 0
      },
      myTop: {
        type: [Number, String],
        default: 0
      },
      myLeft: {
        type: [Number, String],
        default: 0
      }
    },
    data () {
      return {
        myStyle: {
          position: this.myPosition,
          top: `${this.myTop}px`,
          left: `${this.myLeft}px`,
          padding: `${this.myPadding}px`
        }
      }
    },
    methods: {
      back() {
        this.$emit('back')
      }
    }
  }
</script>
<style lang='less' scoped>
  img{
    font-size: 0;
    width: 50px;
    height: 50px;
  }
</style>