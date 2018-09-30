import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态d
	state: {
//		service:'http://192.168.2.239',
		service:'http://202.109.131.175:7080',
		thead:false,
		tfoot:1,
		bottomone:[],
		typefoot:1,
		usertype:0,
		bottomtwoid:'',
		newid:'',
		newstwoid:'',
		uuid:'',
		windexid:'',
		searchid:'',
		ctypeTitle:'选择分类',
		mapid:'',
		lng:'',
		lat:'',
		mimg:''
	}
})

export default store
