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
				setime: '',
				mapcenter: [117.471564,34.366127]
			}
		},
		mounted() {
			this.mylocation()

		},
		methods: {
			change: function() {
				var that = this
				this.start = !this.start
				if(this.start) {
					this.setime = setInterval(function() {
						that.havecenter()
					}, 3000)
				} else {
					clearInterval(this.setime)
				}
			},
			mylocation: function() {
				var that = this
				var map = new AMap.Map('map-container', {
					zoom: 15,
					center: JSON.parse(that.mapcenter)
				})
				var marker = new AMap.Marker({
					title: '提示'
				});
				marker.setMap(map);
			},
			havecenter: function() {
				var that = this
				plus.geolocation.getCurrentPosition(function(p) {
					that.mapcenter = '['+p.coords.longitude+','+p.coords.latitude+']'
					that.mylocation()
					alert(that.service + "/insertCworkBytxt")
					$.ajax({
						type: "post",
						url: that.service + "/insertCworkBytxt",
						dataType: 'json',
						data: {
							cuserId:'4561562562',
							point:'[117.471564,34.366127]'	
						},
						success: function(res) {
							console.log(JSON.stringify(res))
						},
						error:function(err){
							console.log(JSON.stringify(err))
						}
					});
				}, function(e) {
					alert('Geolocation error: ' + e.message);
				});
			}
		},
		computed:{
			service(){
				return this.$store.state.service
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