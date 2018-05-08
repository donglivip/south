<template>
	<div class="map">
		<div id="map-container"></div>
		<div class="img-box" @click="change">
			<transition name='start'>
				<img src="../../static/kai.png" v-show="!start" />
			</transition>
			<transition name='start'>
				<img src="../../static/ting.png" v-show="start" />
			</transition>
		</div>
		<h1 @click="change">
			{{start==false?'开始记录':'停止记录'}}
		</h1>
	</div>
</template>

<script>
	import AMap from 'AMap'
	export default {
		name: 'dmap',
		data() {
			return {
				start: false,
				setime: ''
			}
		},
		mounted() {
			this.mylocation()
		},
		methods: {
			change: function() {
				this.start = !this.start
				if(this.start) {
					this.setime = setInterval(function() {
						console.log(['173.5500', '174.555'])
					}, 3000)
				} else {
					clearInterval(this.setime)
				}
			},
			mylocation:function(){
				var map = new AMap.Map('map-container', {
					zoom: 15,
					center: [116.39, 39.9]
				})
				var marker = new AMap.Marker({
					title: '提示'
				});
				marker.setMap(map);
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	.map {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		#map-container {
			width: 100%;
			flex: 1;
			border-bottom: 1px solid #d5d4d3;
		}
		img {
			display: block;
			width: 1.65rem;
			height: 1.65rem;
		}
		h1 {
			font-size: .35rem;
			text-align: center;
			font-weight: 600;
			margin: .4rem 0;
		}
		.img-box {
			z-index: 555;
			position: relative;
			width: 1.65rem;
			height: 1.65rem;
			margin: -.92rem auto 0;
			border-radius: 50%;
			overflow: hidden;
		}
	}
</style>