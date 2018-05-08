<template>
  <div id="wrapper" class="cindex">
    	<t-head></t-head>
    	<div id="main">
    		<div class="tselect-top">
					<div class="top-nav" :class="swiperindex==0?'active':''" @click="toswiper(0)">
						<img src="../../../static/c-ji-active.png" class="hactive"/>
						<img src="../../../static/c-ji.png" class="hdefault"/>
						<span>
							工作轨迹
						</span>
					</div>
					<div class="top-nav" :class="swiperindex==1?'active':''" @click="toswiper(1)">
						<img src="../../../static/huan-gong-active.png" class="hactive"/>
						<img src="../../../static/huan-gong.png" class="hdefault"/>
						<span>
							工作照
						</span>
					</div>
					<div class="top-nav" :class="swiperindex==2?'active':''" @click="toswiper(2)">
						<img src="../../../static/huan-zheng-active.png" class="hactive"/>
						<img src="../../../static/huan-zheng.png" class="hdefault"/>
						<span>
							整改照
						</span>
					</div>
				</div>
				<swiper :options="swiperOption" ref="mySwiper">
					<swiper-slide>
						<d-map></d-map>
					</swiper-slide>
					<swiper-slide>
						2
					</swiper-slide>
					<swiper-slide>
						3
					</swiper-slide>
				</swiper>
    	</div>
    	<t-foot></t-foot>
  </div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
	  name: 'index',
	  data () {
	    return {
	      swiperOption: {},
				swiperindex: 0
	    }
	  },
	  mounted(){
	  	this.$store.state.tfoot=1
	  },
	  methods:{
			opennew:function(target){
				this.$router.push({
					name:target
				})
			},
			toswiper: function(index) {
				this.swiperindex = index
				this.swiper.slideTo(index, 1000, false)
			},
	  },
	  computed:{
	  	tfoot(){
	  		return this.$store.state.tfoot
	  	},
	  	swiper() {
				return this.$refs.mySwiper.swiper;
			}
	  },
	  components:{
	  	swiper,
			swiperSlide,
	  	THead:resolve => require(['../tourists/thead'],resolve),
	  	TFoot:resolve => require(['./cfoot'],resolve),
	  	DMap: resolve => require(['../map'], resolve)
	  }
	}
</script>

<style type="text/css" lang="scss">
	.cindex{
		.swiper-container{
			height: calc(100% - 1rem);
		}
		.tselect-top {
			display: flex;
			background: #FFFFFF;
			.top-nav {
				flex: 1;
				height: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: .25rem;
				box-sizing: border-box;
				font-weight: 500;
				transition: all .3s;
				border-bottom: 1px solid #d0cdcb;
				flex-direction: column;
				img{
					width: .45rem;
					margin-bottom: .1rem;
				}
				.hactive{
					display: none;
				}
				.hdefault{
					display: block;
				}
			}
			.active {
				color: #1e81d2;
				border-bottom: 2px solid #1e81d2;
				.hactive{
					display: block!important;
				}
				.hdefault{
					display: none!important;
				}
			}
		}
	}
</style>
