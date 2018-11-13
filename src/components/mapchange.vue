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
				var mapcenter = '[' + lng + ',' + lat + ']'
				that.$store.state.lng = lng
				that.$store.state.lat = lat
				var googleLayer = new AMap.TileLayer({
				  getTileUrl: 'http://mt{1,2,3,0}.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galile'
				});
				var roadNetLayer = new AMap.TileLayer.RoadNet();
				var map = new AMap.Map('container', {
					resizeEnable: true,
					zoom: 18,
					dragEnable: true,
					center: JSON.parse(mapcenter),
					layers: [googleLayer,roadNetLayer]
				})
				var marker = new AMap.Marker({
					icon: "http://202.109.131.175:7080/uploadImg/image/lryh/20180730/icon.png",
					position: JSON.parse(mapcenter),
					offset: new AMap.Pixel(-32, -32)
				});
				marker.setMap(map);
				AMap.event.addListener(map, 'dragging', function() {
					marker.setPosition(map.getCenter())
				});
	
				// 停止移动
				AMap.event.addListener(map, 'dragend', function() {
					console.log(map.getCenter())
					marker.setPosition(map.getCenter())
					marker.setAnimation('AMAP_ANIMATION_DROP')
					that.$store.state.lng = map.getCenter().lng
					that.$store.state.lat = map.getCenter().lat
				});
//				var _onClick = function(e) {
//					AMap.service('AMap.Geocoder', function() {
//						var geocoder = new AMap.Geocoder({
//							city: ""
//						});
//						geocoder.getAddress(e.lnglat, function(status, result) {
//							if(status === 'complete' && result.info === 'OK') {
//								marker.setPosition([e.lnglat.lng, e.lnglat.lat]);
//								that.$store.state.lng = e.lnglat.lng
//								that.$store.state.lat = e.lnglat.lat
//							}
//						});
//					})
//				}
//				AMap.event.addListener(map, "click", _onClick);
				var text = new AMap.Text({
					text: '南钢街道办事处',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987917, 28.654204]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '方大工会',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987928, 28.65339]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '南钢花园',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987864, 28.65307]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '冶金大道',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'writing-mode': 'tb-rl',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987499, 28.652618]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北  五 4-1#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'writing-mode': 'tb-rl',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.98508, 28.652797]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北 五 路',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'writing-mode': 'tb-rl',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985723, 28.652919]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '6#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987027, 28.653830]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '5#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987027, 28.653618]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '4#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987027, 28.653324]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '3#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987027, 28.653046]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '2#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987027, 28.652754]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '1#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987027, 28.652495]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '育林小花园',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987027, 28.654562]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '商铺',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986453, 28.654185]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五17#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986045, 28.65386]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五15#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986045, 28.65363]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五13#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986045, 28.65339]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五9#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986045, 28.653179]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五7#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986045, 28.652948]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五5#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986045, 28.652768]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五3#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986045, 28.652509]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五32-4#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.982585, 28.656106]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五32-7#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983106, 28.656115]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五32-9#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983626, 28.656064]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五50#76',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984093, 28.655941]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五32-5#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983363, 28.655833]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五32-2#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.98281, 28.655546]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五32-3#34',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983363, 28.655494]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '育林社区居委会',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983315, 28.655386]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五46#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983942, 28.655433]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五44#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983942, 28.655249]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五48#46',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984355, 28.65555]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五42#34',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984377, 28.655282]
				});

				text.setMap(map);

				//start

				var text = new AMap.Text({
					text: '北五49#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985133, 28.655569]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五47#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985058, 28.655324]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五45#34',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984811, 28.655122]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五43#77',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984586, 28.65492]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五30#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985471, 28.655066]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五28#34',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985632, 28.654821]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五26#34',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985959, 28.654764]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五23#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986308, 28.654835]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五21#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986254, 28.654628]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五24#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985895, 28.654548]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五19#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986292, 28.654421]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五22#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985702, 28.654341]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五43#77',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984575, 28.65492]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五41#77',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984511, 28.654708]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五39#77',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984506, 28.654468]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五37#77',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984704, 28.654232]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五40#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983975, 28.654124]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五38#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984436, 28.654063]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五35#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984913, 28.653959]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五36#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983916, 28.653884]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五34#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984334, 28.653842]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五33#34',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984822, 28.653785]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五31#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984302, 28.65363]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五29#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984811, 28.653573]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五27#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.9842, 28.653409]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五25#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984779, 28.653366]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五20#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985562, 28.654096]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五18#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985552, 28.653875]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五16#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985461, 28.65362]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '单车棚',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985423, 28.653446]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五12#33',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985487, 28.65331]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五10#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985498, 28.653084]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五8#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985466, 28.652872]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五6#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985482, 28.652679]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北五4#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985482, 28.652476]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '安平社区居委会',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985493, 28.652575]
				});

				text.setMap(map);

				//start1

				var text = new AMap.Text({
					text: '2#311',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983245, 28.651888]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '1#411',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.984098, 28.651789]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '4#411',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.982993, 28.65154]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '3#411',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983932, 28.651408]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '8#217',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.98281, 28.651135]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '6#217',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.98325, 28.651125]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '422-2#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985439, 28.651643]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '422-3#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985402, 28.651511]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '422-1#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.985809, 28.651577]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '南钢商厦',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987145, 28.651963]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '1#128',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987284, 28.651901]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '南钢商厦',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.98714, 28.651568]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '2#131',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.987123, 28.651494]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '378#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.986582, 28.65089]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '5#411',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983781, 28.650895]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '10#311',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.982886, 28.650655]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '7#311',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983658, 28.650504]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '12#311',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.982794, 28.650189]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '9#311',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.983535, 28.650094]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四12#58',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988626, 28.652747]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四14#78',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988497, 28.652978]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四16#78',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988572, 28.653232]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四18#78',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988491, 28.653464]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北四20#68',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988717, 28.653689]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四22#68',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988786, 28.653919]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四28#28',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988663, 28.654159]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四30#18',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988593, 28.654381]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四36#28',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988373, 28.654503]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四34#18',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988626, 28.654644]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四32#18',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.988808, 28.654583]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四26#38',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.989189, 28.654159]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四24#18',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.989452, 28.654089]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四13#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.989688, 28.653971]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四10#46',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.989715, 28.653651]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四8#46',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.989698, 28.653317]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四6#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.989709, 28.65302]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四路',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'writing-mode': 'tb-rl',
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.989398, 28.653289]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四路',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'writing-mode': 'tb-rl',
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990305, 28.652538]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北四4#47',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.989784, 28.652688]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四1#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.989301, 28.652422]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北四2#47',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.989913, 28.652441]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三2#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990739, 28.652455]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三4#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990761, 28.652733]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三6#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990621, 28.652992]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三路',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'writing-mode': 'tb-rl',
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990879, 28.653354]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三8#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990643, 28.653477]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三10#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990643, 28.65366]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三12#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990675, 28.653915]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三14#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990659, 28.654183]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三16#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990637, 28.654447]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三19#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991066, 28.654418]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三17#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991082, 28.654268]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '祥和社区居委会',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991061, 28.654174]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三15#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991072, 28.654051]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三13#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991136, 28.653882]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三9#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991109, 28.653599]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三7#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991115, 28.653265]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北三5#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991136, 28.653025]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二2#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991426, 28.652451]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二4#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99141, 28.652738]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二6#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991495, 28.653025]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二8#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991522, 28.653303]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二10#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991506, 28.653543]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二12#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991485, 28.653773]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二14#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991474, 28.653999]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二16#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991458, 28.654235]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二18#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991469, 28.654447]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二22#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991458, 28.654691]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二24#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991469, 28.654889]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二26#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991479, 28.655176]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二28#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991506, 28.655383]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一32#55',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992107, 28.655774]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一30#55',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992064, 28.655562]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一28#55',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992091, 28.65535]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一26#55',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992112, 28.655115]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一24#55',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992112, 28.654903]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一22#55',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992139, 28.654696]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '水塔',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992214, 28.654475]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一18#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992477, 28.654447]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一16#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992445, 28.654216]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一14#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99245, 28.653966]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一12#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99244, 28.65375]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一10#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992483, 28.65351]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一8#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992509, 28.653265]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一6#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992483, 28.652992]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一4#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992483, 28.652752]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一2#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992456, 28.652512]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北二15#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991989, 28.654093]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二13#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991984, 28.653882]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二11#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992005, 28.653684]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北二9#46',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992016, 28.653416]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北二7#46',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.991994, 28.653081]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北二3#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992037, 28.652747]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北二1#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992037, 28.652474]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一3#47',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993024, 28.652818]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一5#57',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992971, 28.653067]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一7#（育嘉禾幼儿园）',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993124, 28.65326]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一9-1#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992992, 28.653444]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一11#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993405, 28.653642]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北三30#77',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99053, 28.654731]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北四38#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990267, 28.654472]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北四11#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990246, 28.654261]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北四9#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.990229, 28.654068]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一9#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992998, 28.653656]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一13#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993405, 28.65383]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一11-1#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993019, 28.653863]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '北一15#45',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993105, 28.654098]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一17#45',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993137, 28.65431]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一19#45',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993132, 28.654531]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一21#24',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.992987, 28.654771]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一21-1#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993362, 28.654753]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一23#45',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99303, 28.655014]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一25#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993083, 28.655263]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '北一27#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99303, 28.65564]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区24#46',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.000915, 28.658573]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区23#46',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.000862, 28.658347]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '散居',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.000663, 28.65813]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '散居',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.000663, 28.658008]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '散居',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.000663, 28.658008]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区22#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001044, 28.658121]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区21#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001007, 28.657899]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '江氨居委会',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.000636, 28.657254]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区20#47',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.000368, 28.656854]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '江氨宾馆',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001007, 28.656657]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区19#34',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.000374, 28.656614]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '尤氨居委会',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.00172, 28.658667]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区16#46',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001704, 28.658394]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区15#53',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001731, 28.658149]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区14#43',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001742, 28.657923]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区13#13',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001742, 28.657683]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区12#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001811, 28.657419]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区11#23',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001742, 28.65724]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区2-1#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001736, 28.65676]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区1-1#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001709, 28.656534]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区26#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001629, 28.656242]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区27#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.001591, 28.656035]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区18#55',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.000647, 28.656181]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区17#55',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.000642, 28.65596]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区28#47',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.00165, 28.655701]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区29#27',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.00209, 28.655965]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区25#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002214, 28.656261]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区1-2#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002187, 28.656525]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '二区2-2#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002138, 28.656756]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区3#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002246, 28.656963]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区4#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002299, 28.657184]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区5#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002299, 28.657438]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区6#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002251, 28.657678]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区7#43',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.00223, 28.657918]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区8#43',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002246, 28.658158]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区9#3.56',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002267, 28.658398]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '二区10#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002348, 28.658653]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区10#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002841, 28.658657]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区9#34',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002841, 28.658394]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区8#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002825, 28.658163]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区7#43',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002852, 28.657904]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区6#43',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002847, 28.657688]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区5#43',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002841, 28.657447]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区4#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002847, 28.65717]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区3#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002857, 28.656949]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区2-1#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.00289, 28.656737]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区1#57',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002847, 28.656515]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '工行   邮局   三门诊',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.002852, 28.656337]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区2-2#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003378, 28.656723]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区11#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003297, 28.656958]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区12#35',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003372, 28.65717]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区13#45',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003313, 28.657415]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区14#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003249, 28.65765]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区15#37',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003345, 28.657904]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区16#2.57',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.00334, 28.658135]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '一区17#2.57',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003297, 28.658422]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '散户',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.00378, 28.657523]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '母子宿舍6#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003823, 28.65741]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '母子宿舍5#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003903, 28.657264]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '母子宿舍4#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003839, 28.657179]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '母子宿舍3#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003812, 28.657085]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '母子宿舍2#',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.003818, 28.657005]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '新区5#47',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.006543, 28.66022]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '新区4#57',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.007176, 28.660201]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '新区3#57',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.007106, 28.659961]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '新区2#57',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.007122, 28.659731]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '新区1#56',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [116.007122, 28.659481]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '家园路',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'writing-mode': 'tb-rl',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.994194, 28.627982]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '2#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.994371, 28.627766]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '4#56',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993394, 28.627502]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '1#57',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.994451, 28.627526]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '家园社区居委会',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99428, 28.627352]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '5#56',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.993459, 28.627196]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '11#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.994264, 28.627215]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '3#16',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.995111, 28.627281]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '12#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.994022, 28.626961]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '6#13',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.994483, 28.627008]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '10#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.995009, 28.627045]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '13#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.994022, 28.626768]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '9#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.994387, 28.626791]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '8#34',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.994805, 28.626801]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '7#45',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99429, 28.626589]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '三风堂',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.995127, 28.626575]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '6#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.998169, 28.627161]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '5#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.9987, 28.627067]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '3#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.999081, 28.626996]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '7#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.998019, 28.627015]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '4#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.998652, 28.626893]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '2#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.999075, 28.626784]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '1#46',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.998662, 28.626667]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '家园社区居家养老中心 ',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.998008, 28.626832]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '7#16',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.999369, 28.632638]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '5#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99901, 28.632426]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '6#3.56',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.999482, 28.632426]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '居民活动室',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.998854, 28.632214]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '4#25',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99909, 28.631889]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '3#26',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.99893, 28.631672]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '1#36',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.999117, 28.631371]
				});

				text.setMap(map);
				var text = new AMap.Text({
					text: '2#16',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.999364, 28.631682]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '方大单身楼#12',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.999284, 28.631272]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '方大工会',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.999305, 28.632049]
				});

				text.setMap(map);

				var text = new AMap.Text({
					text: '运输部小区',
					textAlign: 'center', // 'left' 'right', 'center',
					verticalAlign: 'middle', //middle 、bottom
					draggable: false,
					cursor: 'pointer',

					style: {

						'text-shadow': '1px 0px 0px #fff,-1px 0px 0px #fff,0px 1px 0px #fff,0px -1px 0px #fff',
						'background-color': 'rgba(0,0,0,0)',
						'border-width': 0,
						'text-align': 'center',
						'font-size': '14px',
						'color': '#333333'
					},
					position: [115.999258, 28.631804]
				});
				text.setMap(map);
			}, function(e) {
				alert('定位失败,请检查网络是否正常，或者是否打开了定位服务');
			});
		},
		methods: {
			mapshow: function(type) {
				this.$emit('mapshow', type)
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
				line-height: .8rem;
				color: white;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>