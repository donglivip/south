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
      path: '/tuser',
      name: 'tuser',
      component:resolve => require(['@/components/tourists/tuser'], resolve)
    },{
      path: '/hindex',
      name: 'hindex',
      component:resolve => require(['@/components/health/hindex'], resolve)
    },{
      path: '/windex',
      name: 'windex',
      component:resolve => require(['@/components/wadmin/windex'], resolve)
    },{
      path: '/wuser',
      name: 'wuser',
      component:resolve => require(['@/components/wadmin/wuser'], resolve)
    },{
      path: '/huser',
      name: 'huser',
      component:resolve => require(['@/components/health/huser'], resolve)
    },{
      path: '/cindex',
      name: 'cindex',
      component:resolve => require(['@/components/cguan/cindex'], resolve)
    },{
      path: '/cuser',
      name: 'cuser',
      component:resolve => require(['@/components/cguan/cuser'], resolve)
    },{
      path: '/cjuan',
      name: 'cjuan',
      component:resolve => require(['@/components/cguan/cjuan'], resolve)
    },{
      path: '/csearch',
      name: 'csearch',
      component:resolve => require(['@/components/cguan/csearch'], resolve)
    },{
      path: '/cdetail',
      name: 'cdetail',
      component:resolve => require(['@/components/cguan/cdetail'], resolve)
    }
  ]
})
