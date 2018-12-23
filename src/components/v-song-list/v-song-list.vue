<template>
  <div class="song-list-container">
    <ul class="song-list">
      <li
        v-for="(song, index) in songList" :key="index"
        class="song"
        @click="selectSong(index, song)">
        <div class="number">
          <span :class="(index===0||index===1||index===2)?'number-active':''">
            {{index + 1}}
          </span>
        </div>
        <div class="song-info">
          <div class="song-name">{{song.name}}</div>
          <span class="song-author" v-for="(item, index) in song.singer" :key="index">
            {{item.name}} {{(index + 1) === song.singer.length ? '' : '-'}}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      simpleSong: {
        type: Array,
        default: null
      },
      songList: {
        type: Array,
        default: null
      }
    },
    name: 'v-song-list',
    data () {
      return {
      }
    },
    components: {},
    computed: {},
    methods: {
      selectSong(index, song) {
        this.$emit('selectSong', index, song)
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../assets/less/mixin.less';
  .song-list-container{
    .song-list{
      padding: 5.3vw 0;
      .song{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #777;
        .number{
          padding: 5vw;
          width: 10vw;
          text-align: center;
          .number-active{
            color: #f60;
          }
        }
        .song-info{
          width: 75%;
          .no-wrap();
          .song-name{
            padding-bottom: 2vw;
            color: rgb(29, 26, 26);
            .no-wrap();
          }
          .song-author{
            font-size: 14px;
            .no-wrap();
          }
        }
      }
    }
  }
</style>