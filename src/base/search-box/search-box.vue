<template>
  <div class="search-box">
    <input class="input" maxlength="15" v-model="text" placeholder="搜索歌曲" />
    <img src="./images/search.png" alt="" class="search-icon">
    <img src="./images/delete.png" alt="" class="delete-icon"
      v-show="deleteInput"
      @click="deleteText">
  </div>
</template>
<script>
  import {debounce} from 'assets/js/util/util'
  export default {
    name: 'search-box',
    data () {
      return {
        text: ''
      }
    },
    created() {
      // 这里一定要在created中写watch
      this.$watch('text', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    },
    computed: {
      deleteInput() {
        const isDelete = this.text.length !== 0
        return isDelete
      }
    },
    watch: {
      // text(newText) {
      //   debounce((newText) => {
      //     this.$emit('query', newText)
      //   }, 200)
      // }
    },
    methods: {
      deleteText() {
        this.$emit('deleteText')
      }
    }
  }
</script>
<style lang='less' scoped>
  .search-box{
    width: 90%;
    margin: 2vh auto;
    z-index: 2;
    position: relative;
    input{
      box-sizing: border-box;
      padding-left: 12vw;
      width: 100%;
      height: 5vh;
      border-radius: 5px;
      font-size: 18px;
      color: rgb(117, 113, 106);
      background-color: #fff;
      outline-color: #77d19b
    }
    .search-icon, .delete-icon{
      width: 8vw;
      height: 8vw;
    }
    .search-icon{
      position: absolute;
      top: 0.5vh;
      left: 2vw;
    }
    .delete-icon{
      position: absolute;
      top: 0.2vh;
      right: 2vw;
    }
  }
</style>