<template>
  <div class="tab">
    <router-link tag="div" to="/recommend">
      <span class="link-item" :class="active===true?'defalut-active':''">推荐</span>
    </router-link>
    <router-link tag="div" to="/rank">
      <span class="link-item">排行榜</span>
    </router-link>
    <router-link tag="div" to="/search">
      <span class="link-item">搜索</span>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: 'tab',
    data () {
      return {
      }
    },

    computed: {
      active() {
        if (this.$route.path === '/') {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../assets/less/variable.less';
  .defalut-active{
    // 默认选中第一个tab
    color: @hover-color !important;
  }
  .router-link-active{
    span{
      color: @hover-color !important;
    }
  }
  .tab{
    background-color: @conponent-bg-color;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    .link-item{
      font-size: @font-size-medium-x;
      color: @font-color;
    }
  }
</style>