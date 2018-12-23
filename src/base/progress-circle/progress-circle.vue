<template>
  <div class="circle-wrapper">
    <svg :width="radius" :height="radius" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle :cy="halfRadius" :cx="halfRadius" :r="circleR" stroke-width="3"
        stroke="green" fill="none" :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"></circle>
    </svg>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'progress-circle',
    props: {
      radius: {
        type: Number,
        default: 100
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    computed: {
      halfRadius () {
        return this.radius / 2
      },
      circleR() {
        console.log()
        return (this.radius / 2) - 2
      },
      dashArray() {
        return Math.PI * this.circleR * 2
      },
      dashOffset() {
        return (1 - this.percent) * this.dashArray
      }
    }
  }
</script>
<style lang='less' scoped>
  .circle-wrapper{
    position: relative;
    circle{
      transform-origin: center;
      transform: rotate(-90deg);
    }
  }
</style>