import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component:resolve => require(['@/components/home'], resolve)
    },{
    	path:'',
    	redirect:'/home'
    },{
      path: '/tindex',
      name: 'tindex',
      component:resolve => require(['@/components/tourists/tindex'], resolve)
    },{
      path: '/tselect',
      name: 'tselect',
      component:resolve => require(['@/components/tourists/tselect'], resolve)
    },{
      path: '/user',
      name: 'user',
      component:resolve => require(['@/components/user'], resolve)
    },{
      path: '/hindex',
      name: 'hindex',
      component:resolve => require(['@/components/health/hindex'], resolve)
    }
  ]
})
