import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态d
	state: {
//		service:'http://192.168.2.223',
		service:'http://27.54.248.14:8080',
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
		ctypeTitle:'选择分类'
	}
})

export default store
