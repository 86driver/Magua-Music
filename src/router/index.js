import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/v-recommend/v-recommend.vue'
import Rank from 'components/v-rank/v-rank.vue'
import Search from 'components/v-search/v-search.vue'
import RankDisc from 'components/v-rank-disc/v-rank-disc.vue'
import CdList from 'components/v-cd-list/v-cd-list.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Recommend
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: CdList
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDisc
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
