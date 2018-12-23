<template>
  <div class="loading">
    <span>{{title}}</span>
    <img src="./loading.gif" alt="">
  </div>
</template>
<script>
  export default {
    name: 'loading',
    props: {
      title: {
        type: String,
        default: '正在加载'
      }
    }
  }
</script>
<style lang='less' scoped>
  .loading{
    span{
      vertical-align: middle;
      color: rgba(7, 17, 27, 0.4);
    }
    img{
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
  }
</style>