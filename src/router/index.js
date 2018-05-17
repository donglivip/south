import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  {
      path: '/changepwd',
      name: 'changepwd',
      component:resolve => require(['@/components/changepwd'], resolve)
   },
  {
      path: '/register',
      name: 'register',
      component:resolve => require(['@/components/register'], resolve)
   },
  	{
      path: '/login',
      name: 'login',
      component:resolve => require(['@/components/login'], resolve)
   },{
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
      path: '/wwang',
      name: 'wwang',
      component:resolve => require(['@/components/wadmin/wwang'], resolve)
    },{
      path: '/ydetail',
      name: 'ydetail',
      component:resolve => require(['@/components/ydetail'], resolve)
    },{
      path: '/huser',
      name: 'huser',
      component:resolve => require(['@/components/health/huser'], resolve)
    },{
      path: '/hwork',
      name: 'hwork',
      component:resolve => require(['@/components/health/hwork'], resolve)
    },{
      path: '/hchange',
      name: 'hchange',
      component:resolve => require(['@/components/health/hchange'], resolve)
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
    },{
      path: '/can',
      name: 'can',
      component:resolve => require(['@/components/cguan/can'], resolve)
    },{
      path: '/cbackdetail',
      name: 'cbackdetail',
      component:resolve => require(['@/components/cbackdetail'], resolve)
    },{
      path: '/userinform',
      name: 'userinform',
      component:resolve => require(['@/components/userinform'], resolve)
    },{
      path: '/admin',
      name: 'admin',
      component:resolve => require(['@/components/admin/admin'], resolve)
    },{
      path: '/yidetail',
      name: 'yidetail',
      component:resolve => require(['@/components/yidetail'], resolve)
    },{
      path: '/hworkdetail',
      name: 'hworkdetail',
      component:resolve => require(['@/components/hworkdetail'], resolve)
    }
  ]
})
