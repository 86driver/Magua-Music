<template>
  <div class="header-container">
    <img src="../../assets/images/logo.png" alt="">
    <div class="title">麻瓜-Music</div>
  </div>
</template>

<script>
  export default {
    name: 'v-header',
    data() {
      return {
      }
    },

    components: {},

    computed: {}
  }

</script>
<style lang='less' scoped>
  @import '../../assets/less/variable.less';

  .header-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 44px;
    background-color: #31c27c;
    img{
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
    .title{
      display: flex;
      padding-left: 0.2em;
      color: @font-color;
      font-size: @font-size-large;
      font-family: Arial, Helvetica, sans-serif
    }
  }
</style>