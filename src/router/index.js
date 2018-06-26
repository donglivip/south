import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  {
      path: '/changepwd',
      name: 'changepwd',
      component:resolve => require(['@/components/changepwd'], resolve),
      meta: { keepAlive: false}  
   },
  {
      path: '/register',
      name: 'register',
      component:resolve => require(['@/components/register'], resolve),
      meta: { keepAlive: false}  
   },
  	{
      path: '/login',
      name: 'login',
      component:resolve => require(['@/components/login'], resolve),
      meta: { keepAlive: false}  
   },{
      path: '/home',
      name: 'home',
      component:resolve => require(['@/components/home'], resolve),
      meta: { keepAlive: false}  
    },{
    	path:'',
    	redirect:'/home'
    },{
      path: '/tindex',
      name: 'tindex',
      component:resolve => require(['@/components/tourists/tindex'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/tselect',
      name: 'tselect',
      component:resolve => require(['@/components/tourists/tselect'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/tuser',
      name: 'tuser',
      component:resolve => require(['@/components/tourists/tuser'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/hindex',
      name: 'hindex',
      component:resolve => require(['@/components/health/hindex'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/windex',
      name: 'windex',
      component:resolve => require(['@/components/wadmin/windex'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/wuser',
      name: 'wuser',
      component:resolve => require(['@/components/wadmin/wuser'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/wwang',
      name: 'wwang',
      component:resolve => require(['@/components/wadmin/wwang'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/ydetail',
      name: 'ydetail',
      component:resolve => require(['@/components/ydetail'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/huser',
      name: 'huser',
      component:resolve => require(['@/components/health/huser'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/hwork',
      name: 'hwork',
      component:resolve => require(['@/components/health/hwork'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/hchange',
      name: 'hchange',
      component:resolve => require(['@/components/health/hchange'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/cindex',
      name: 'cindex',
      component:resolve => require(['@/components/cguan/cindex'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/cuser',
      name: 'cuser',
      component:resolve => require(['@/components/cguan/cuser'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/cjuan',
      name: 'cjuan',
      component:resolve => require(['@/components/cguan/cjuan'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/csearch',
      name: 'csearch',
      component:resolve => require(['@/components/cguan/csearch'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/cdetail',
      name: 'cdetail',
      component:resolve => require(['@/components/cguan/cdetail'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/can',
      name: 'can',
      component:resolve => require(['@/components/cguan/can'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/cbackdetail',
      name: 'cbackdetail',
      component:resolve => require(['@/components/cbackdetail'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/userinform',
      name: 'userinform',
      component:resolve => require(['@/components/userinform'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/asearch',
      name: 'asearch',
      component:resolve => require(['@/components/admin/asearch'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/acan',
      name: 'acan',
      component:resolve => require(['@/components/admin/acan'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/hworkdetail',
      name: 'hworkdetail',
      component:resolve => require(['@/components/hworkdetail'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/changedetail',
      name: 'changedetail',
      component:resolve => require(['@/components/changedetail'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/ajuan',
      name: 'ajuan',
      component:resolve => require(['@/components/admin/ajuan'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/auser',
      name: 'auser',
      component:resolve => require(['@/components/admin/auser'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/allguiji',
      name: 'allguiji',
      component:resolve => require(['@/components/allguiji'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/allanjuan',
      name: 'allanjuan',
      component:resolve => require(['@/components/allanjuan'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/allgongzuo',
      name: 'allgongzuo',
      component:resolve => require(['@/components/allgongzuo'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/staticword',
      name: 'staticword',
      component:resolve => require(['@/components/staticword'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/staticuser',
      name: 'staticuser',
      component:resolve => require(['@/components/staticuser'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/staticuser01',
      name: 'staticuser01',
      component:resolve => require(['@/components/staticuser01'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/mygrid',
      name: 'mygrid',
      component:resolve => require(['@/components/wadmin/mygrid'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/allwor',
      name: 'allwor',
      component:resolve => require(['@/components/allwor'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/news',
      name: 'news',
      component:resolve => require(['@/components/news'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/newdetail',
      name: 'newdetail',
      component:resolve => require(['@/components/newdetail'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/yfoot',
      name: 'yfoot',
      component:resolve => require(['@/components/yke/yfoot'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/yindex',
      name: 'yindex',
      component:resolve => require(['@/components/yke/yindex'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/yselect',
      name: 'yselect',
      component:resolve => require(['@/components/yke/yselect'], resolve),
      meta: { keepAlive: true}  
    },{
      path: '/allchuli',
      name: 'allchuli',
      component:resolve => require(['@/components/allchuli'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/adetail',
      name: 'adetail',
      component:resolve => require(['@/components/admin/adetail'], resolve),
      meta: { keepAlive: false}  
    },{
      path: '/gongzuolist',
      name: 'gongzuolist',
      component:resolve => require(['@/components/gongzuolist'], resolve),
      meta: { keepAlive: false}  
    }
  ]
})
