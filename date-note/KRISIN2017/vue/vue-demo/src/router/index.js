import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Tooltip from '@/components/Tooltip'
import Tabs from '@/components/Tabs'
import Search from '@/components/Search'
import Change from '@/components/Change'
import Addnum from '@/components/Addnum'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/tooltip',
      name: 'Tooltip',
      component: Tooltip
    },
    {
      path: '/tabs',
      name: 'Tabs',
      component: Tabs
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/change',
      name: 'Change',
      component: Change
    },
    {
      path: '/addnum',
      name: 'Addnum',
      component: Addnum
    }
  ]
})
