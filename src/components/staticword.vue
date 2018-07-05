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
			var chartoption = {
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data: ['上报数量', '处理数量']
				},
				xAxis: [{
					type: 'category',
					data: []
				}],
				yAxis: [{
					type: 'value'
				}],
				dataZoom: [{
						show: true,
						start: 80,
						end: 100
					},
					{
						type: 'inside',
						start: 80,
						end: 100
					}
				],
				series: [{
						name: '上报数量',
						type: 'bar',
						data: [],
						itemStyle: {
							normal: {
								color: '#1e81d2'
							}
						}
					},
					{
						name: '处理数量',
						type: 'bar',
						data: [],
						itemStyle: {
							normal: {
								color: '#4ad2ff'
							}
						}
					},
				]
			}
			var that=this
			plus.nativeUI.showWaiting('图表生成中')
			$.ajax({
				type: "post",
				url: that.service + "/queryAndGridAndCtypeIdReportCount",
				dataType: 'json',
				asycn:false,
				data: {},
				success: function(res) {
					for(var i=0;i<res.data[0].length;i++){
							res.data[0][i].count2=res.data[i+1].count2
						}
					for(var i=0;i<res.data[0].length;i++){
						chartoption.xAxis[0].data.push(res.data[0][i].cmultipleCommunitiesName)
						chartoption.series[0].data.push(res.data[0][i].count1)
						chartoption.series[1].data.push(res.data[0][i].count2)
					}
					let myChart = echarts.init(document.getElementById('myChart'))
					myChart.setOption(chartoption)
					plus.nativeUI.closeWaiting()
				}
			});
			
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
			service() {
				return this.$store.state.service
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