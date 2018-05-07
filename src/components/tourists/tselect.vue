<template>
  <div id="wrapper" class="tselect">
    	<t-head></t-head>
    	<div id="main">
    		<div class="tselect-top">
    			<div class="top-nav" :class="swiperindex==0?'active':''" @click="toswiper(0)">
    				已整改案卷
    			</div>
    			<div class="top-nav" :class="swiperindex==1?'active':''" @click="toswiper(1)">
    				未整改案卷
    			</div>
    		</div>
    		<swiper :options="swiperOption" ref="mySwiper">
					<!-- 这部分放你要渲染的那些内容 -->
					<swiper-slide>
						1
					</swiper-slide>
					<swiper-slide>
						2
					</swiper-slide>
				</swiper>
    	</div>
    	<t-foot></t-foot>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'tselect',
  data () {
    return {
      swiperOption: {
				
			},
			swiperindex:0
    }
  },
  components:{
  	swiper,
		swiperSlide,
  	THead:resolve => require(['./thead'],resolve),
  	TFoot:resolve => require(['./tfoot'],resolve)
  },
  mounted(){
  	this.$store.state.tfoot=2
  },
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper;
		}
	},
	methods:{
		toswiper:function(index){
			this.swiperindex=index
			this.swiper.slideTo(index, 1000, false)
		}
	}
}
</script>

<style type="text/css" lang="scss">
	.tselect{
		background: #eeeeee;
		.tselect-top{
			display: flex;
			background: #FFFFFF;
			.top-nav{
				flex: 1;
				height: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: .26rem;
				box-sizing: border-box;
				font-weight: 500;
				transition: all .3s;
				border-bottom: 2px solid #FFFFFF;
			}
			.active{
				color: #1e81d2;
				border-bottom: 2px solid #1e81d2;
			}
		}
	}
</style>
