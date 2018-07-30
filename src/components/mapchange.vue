<template>
	<div class="wrapper mapchange">
		<div id="container"></div>
		<div class="btn-box">
			<div class="btn" @click="mapshow(1)">
				确定
			</div>
			<div class="btn" @click="mapshow">
				取消
			</div>
		</div>
	</div>
</template>

<script>
	import AMap from 'AMap'
	export default {
		name: 'mapchange',
		data() {
			return {
				map: '',
				marker: ''
			}
		},
		mounted() {
			var that = this
			plus.geolocation.getCurrentPosition(function(p) {
				var lng = p.coords.longitude
				var lat = p.coords.latitude
				var mapcenter='[' + lng + ',' + lat + ']'
				console.log(JSON.parse(mapcenter))
				that.map = new AMap.Map('container', {
					zoom: 15,
					center: JSON.parse(mapcenter)
				})
				new AMap.InfoWindow({
					content: '当前位置'
				}).open(that.map, JSON.parse(mapcenter));
				var _onClick = function(e) {
					AMap.service('AMap.Geocoder', function() {
						var geocoder = new AMap.Geocoder({
							city: ""
						});
						geocoder.getAddress(e.lnglat, function(status, result) {
							if(status === 'complete' && result.info === 'OK') {
								var info = [];
								info.push(result.regeocode.formattedAddress)
								new AMap.InfoWindow({
									content: info.join("<br>") //使用默认信息窗体框样式，显示信息内容
								}).open(that.map, e.lnglat);
								that.$store.state.lng = e.lnglat.lng
								that.$store.state.lat = e.lnglat.lat
							}
						});
					})
				}
				AMap.event.addListener(that.map, "click", _onClick);
			}, function(e) {
				alert('定位失败,请检查网络是否正常，或者是否打开了定位服务');
			});
		},
		methods: {
			mapshow: function(type) {
				this.$emit('mapshow',type)
			}
		},
		computed: {
			lng() {
				return this.$store.state.lng
			},
			lat() {
				return this.$store.state.lat
			}
		}
	}
</script>

<style lang="scss">
	.mapchange {
		position: fixed!important;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		#container {
			width: 100%;
			height: 100%;
		}
		.btn-box {
			display: flex;
			background: #1e81d2;
			width: 100%;
			.btn {
				flex: 1;
				line-height: .6rem;
				color: white;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid #FFFFFF;
			}
		}
	}
</style>