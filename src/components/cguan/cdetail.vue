<template>
	<div id="wrapper" class="cdetail">
		<div id="head">
			<span @click="back"><img src="../../../static/back.png"/></span>
			<div>轨迹详情</div>
			<span style=""></span>
		</div>
		<div id="main" class="big-main" style="overflow: hidden;">
			<div class="csearch-top">
				<div class="csearch-inner">
					<div class="csearch-group" @click="timeshow">
						<img src="../../../static/date.png" />
						<input type="text" placeholder="请选择日期" v-model="mydate" />
						<img src="../../../static/xiaxia.png" style="height: .15rem;width: .27rem;" />
					</div>
					<div class="go-search flexc" @click="myajax()">
						查询
					</div>
				</div>
			</div>
			<div class="map">
				<div id="map-container"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'cdetail',
		data() {
			return {
				mydate: '请选择日期',
				startshow: false,
				mydata: []
			}
		},
		mounted() {
			this.myajax()
		},
		methods: {
			myajax: function() {
				plus.nativeUI.showWaiting('数据加载中')
				var that = this
				var dataJson = {
					cuserId: that.searchid,
					createTime1: that.mydate
				}
				if(that.mydate == '请选择日期') {
					delete dataJson.createTime1
				}
				$.ajax({
					type: "get",
					url: that.service + "/queryAllWorkByCreateTime",
					dataType: 'json',
					data: dataJson,
					success: function(res) {
						plus.nativeUI.closeWaiting()
						
						if(res.data.length>=2){
							var array1 = res.data[that.mapid].split("],")
							array1.pop()
							
							for(var i = 0; i < array1.length; i++) {
								array1[i] = array1[i] + ']'
								if(i % 2 == 1) {
									that.mydata.push(JSON.parse(array1[i]));
								}
							}
							that.mylocation()
						}else{
							plus.nativeUI.toast('该用户暂无轨迹')
						}
					}
				});
			},
			mylocation: function() {
				var that = this
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
						path: that.mydata
					}]);

					//创建一个巡航器
					var navg0 = pathSimplifierIns.createPathNavigator(0, //关联第1条轨迹
						{
							loop: true, //循环播放
							speed: 500,
							pathNavigatorStyle: {
								width: 24,
								height: 24,
								//使用图片
								content: PathSimplifier.Render.Canvas.getImageContent('../../../static/plane.png', onload, onerror),
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
			},
			back: function() {
				this.$router.back()
			},
			timeshow: function(type) {
				var that = this
				plus.nativeUI.pickDate(function(e) {
					var d = e.date;
					if(type == 0) {
						that.mydate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
					} else {
						that.mydate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
					}
				}, function(e) {
					console.log("未选择日期：" + e.message);
				});
			},
			startchang: function(date, formatDate) {
				this.date = formatDate
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			}
		},
		computed: {
			service() {
				return this.$store.state.service
			},
			searchid() {
				return this.$store.state.searchid
			},
			mapid() {
				return this.$store.state.mapid
			}

		},
		components: {
			THead: resolve => require(['../tourists/thead'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.cdetail {
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
		background: #EEEEEE;
		.csearch-top {
			background: white;
			height: 1rem;
			margin-bottom: .17rem;
		}
		.csearch-inner {
			margin: 0 .34rem;
			display: flex;
			align-items: center;
			height: 100%;
			.csearch-group {
				border: 1px solid #1e81d2;
				color: #1e81d2;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 4.36rem;
				height: .6rem;
				border-radius: .1rem;
				overflow: hidden;
				margin-right: .3rem;
				img {
					width: .35rem;
					margin: 0 .25rem;
				}
				input {
					width: 100%;
					height: 100%;
					border: 0;
					color: #1e81d2;
				}
				input::-webkit-input-placeholder {
					color: #1e81d2;
				}
			}
			.go-search {
				background: #1e81d2;
				color: white;
				width: 1.8rem;
				height: .6rem;
				border-radius: .1rem;
				margin-left: .2rem;
			}
		}
	}
</style>