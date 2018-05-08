<template>
	<div class="map">
		<div id="map-container"></div>
	</div>
</template>

<script>
	import AMap from 'AMap'
	export default {
		name: 'dmap',
		data() {
			return {

			}
		},
		mounted() {
			this.mylocation()
		},
		methods: {
			mylocation: function() {
				var map = new AMap.Map('map-container', {
					zoom: 15,
					center: [116.39, 39.9]
				})
				//加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分 
				AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {

					if(!PathSimplifier.supportCanvas) {
						alert('当前环境不支持 Canvas！');
						return;
					}

					//启动页面
					initPage(PathSimplifier);
				});

				function initPage(PathSimplifier) {
					//创建组件实例
					var pathSimplifierIns = new PathSimplifier({
						zIndex: 100,
						map: map, //所属的地图实例
						getPath: function(pathData, pathIndex) {
							//返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
							return pathData.path;
						},
						getHoverTitle: function(pathData, pathIndex, pointIndex) {
							//返回鼠标悬停时显示的信息
							if(pointIndex >= 0) {
								//鼠标悬停在某个轨迹节点上
								return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
							}
							//鼠标悬停在节点之间的连线上
							return pathData.name + '，点数量' + pathData.path.length;
						},
						renderOptions: {
							//轨迹线的样式
							pathLineStyle: {
								strokeStyle: 'white',
								lineWidth: 4,
								dirArrowStyle: true
							}
						}
					});

					//这里构建两条简单的轨迹，仅作示例
					pathSimplifierIns.setData([{
						name: '轨迹名称',
						path: [
							[100.340417, 27.376994],
							[108.426354, 37.827452],
							[113.392174, 31.208439],
							[124.905846, 42.232876]
						]
					}]);

					//创建一个巡航器
					var navg0 = pathSimplifierIns.createPathNavigator(0, //关联第1条轨迹
						{
							loop: true, //循环播放
							speed: 1000000,
							pathNavigatorStyle: {
								width: 24,
								height: 24,
								//使用图片
								content: PathSimplifier.Render.Canvas.getImageContent('./img/plane.png', onload, onerror),
								strokeStyle: null,
								fillStyle: null,
								//经过路径的样式
								pathLinePassedStyle: {
									lineWidth: 6,
									strokeStyle: '#1e81d2',
									dirArrowStyle: {
										stepSpace: 15,
										strokeStyle: 'white'
									}
								}
							}
						});

					navg0.start();
				}
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