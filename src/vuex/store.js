import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态
	state: {
		thead:false,
		tfoot:1,
		navdata:['环卫工作者','环保小卫士','网格管理员'],
		navid:''
	}
})

export default store