<template>
	<div id="wrapper">
		<div id="head">
			<span @click="back">
					<img src="../../static/back.png"/>
				</span>
			<div>美丽南钢</div>
			<span></span>
		</div>
		<div id="main">
			<div id="myChart"></div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'staticword',
		data() {
			return {

			}
		},
		mounted() {
			let myChart = echarts.init(document.getElementById('myChart'))
			myChart.setOption({
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'line' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data: ['已处理', '未处理']
				},
				xAxis: [{
					type: 'category',
					data: ['店铺001', '店铺002', '店铺003', '店铺004', '店铺005', '店铺006', '店铺007', '店铺001', '店铺002', '店铺003', '店铺004', '店铺005', '店铺006', '店铺007']
				}],
				yAxis: [{
					type: 'value'
				}],
				dataZoom: [{
						show: true,
						start: 94,
						end: 100
					},
					{
						type: 'inside',
						start: 94,
						end: 100
					},
					{
						show: true,
						yAxisIndex: 0,
						filterMode: 'empty',
						width: 30,
						height: '80%',
						showDataShadow: false,
						left: '93%'
					}
				],
				series: [{
						name: '已处理',
						type: 'bar',
						data: [862, 1018, 964, 1026, 1679, 1600, 1570, 862, 1018, 964, 1026, 1679, 1600, 1570],
						 itemStyle:{
                                    normal:{
                                        color:'#1e81d2'
                                    }
                                }
					},
					{
						name: '未处理',
						type: 'bar',
						data: [620, 732, 701, 734, 1090, 1130, 1120, 862, 1018, 964, 1026, 1679, 1600, 1570],
												 itemStyle:{
                                    normal:{
                                        color:'#4ad2ff'
                                    }
                                }
					},
				]
			})
		},
		methods: {
			back: function() {
				this.$router.back()
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			}
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			}
		},
		components: {

		}
	}
</script>

<style type="text/css" lang="scss">
	#myChart {
		height: 100%;
	}
</style>