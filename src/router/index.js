import Vue from 'vue'
import Router from 'vue-router'
import dlick from '@/components/dlick'
import dd from '@/components/dd'
import dw from '@/components/dw'
import bm from '@/components/bm'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dlick',
      component: dlick
    },
    {
      path: '/dd',
      name: 'dd',
      component: dd
    }, 
    {
      path: '/dw',
      name: 'dw',
      component: dw
    },
      {
        path: '/bm',
        name: 'bm',
        component: bm
      }
  ]
})
