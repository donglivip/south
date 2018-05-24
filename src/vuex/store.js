import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态
	state: {
		thead:false,
		tfoot:1,
		navdata:[{
			name:'一级分类01',
			date:[
				'二级分类001',
				'二级分类002',
				'二级分类003',
				'二级分类004',
				'二级分类005'
			]
		},{
			name:'一级分类02',
			date:[
				'二级分类021',
				'二级分类022',
				'二级分类023',
				'二级分类024',
				'二级分类025'
			]
		},{
			name:'一级分类03',
			date:[
				'二级分类031',
				'二级分类032',
				'二级分类033',
				'二级分类034',
				'二级分类035'
			]
		}],
		typefoot:1
	}
})

export default store