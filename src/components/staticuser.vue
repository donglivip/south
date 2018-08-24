<template>
	<div id="wrapper" class="tselect">
		<transition name='alert'>
			<div class="alert" v-show="alertboo" @click="alerttab">
				<div class="alert-inner">
					<div class="alert-text">
						日期填写不完整
					</div>
					<div class="alert-setting">
						<div class="setting-group">
							确定
						</div>
					</div>
				</div>
			</div>
		</transition>
		<div id="head">
			<span @click="back">
					<img src="../../static/back.png"/>
				</span>
			<div>美丽南钢</div>
			<span></span>
		</div>
		<div id="main" style="height: calc(100% - .8rem);">
			<div class="time-box" style="padding-left: 0;">
				<div class="time-left">
					<div class="left-box">
						<div class="box" @click="timeshow(0)" style="width: 40%;">
							{{starttime==''?'开始时间':starttime}}
							<img src="../../static/arrbottom.png" />
						</div>
						<span class="hr"></span>
						<div class="box" @click="timeshow(1)" style="width: 40%;">
							{{endtime==''?'结束时间':endtime}}
							<img src="../../static/arrbottom.png" />
						</div>
					</div>
					<div class="left-box">
						<div class="box" style="width: 40%;">
							<input type="text" v-model="grid" placeholder="搜索名称" />
							<img src="../../static/arrbottom.png" />
						</div>
						<span class="hr"></span>
						<div class="box box-go" @click="myajax" style="width: 40%!important;margin: 0;border-radius: 0;">
							搜索
						</div>
					</div>
				</div>

			</div>
			<table>
				<tr class="title">
					<!--<td>
						姓名
					</td>-->
					<td>
						网格名
					</td>
					<td>
						上报数量
					</td>
					<td>
						处理数量
					</td>
				</tr>
				<tr v-for="val in mydata" v-if="val.count1!=0||val.count2!=0">
					<td>
						{{val.cgridName}}
					</td>
					<td>
						{{val.count1}}
					</td>
					<td>
						{{val.count2=='null'?'0':val.count2}}
					</td>
				</tr>
			</table>
			<p v-if="mydata.length==0">
				暂无数据
			</p>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'can',
		data() {
			return {
				defaultDate: new Date(),
				starttime: '',
				endtime: '',
				startshow: false,
				timety: 0,
				alertboo: false,
				navboo: false,
				navtext: '选择分类',
				navindex: -1,
				grid: '',
				texttype: '0',
				mydata: []
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		mounted() {
			this.myajax()
		},
		computed: {
			navdata() {
				return this.$store.state.navdata
			},
			service() {
				return this.$store.state.service
			}
		},
		methods: {
			myajax: function() {
				plus.nativeUI.showWaiting("数据加载中...");
				var that = this;
				var ajaxData = {
					createTime1: that.starttime,
					handingTime1: that.endtime,
					cgridName: that.grid
				}
				if(that.starttime == '') {
					delete ajaxData.createTime1
				}
				if(that.endtime == '') {
					delete ajaxData.handingTime1
				}
				if(that.grid == '') {
					delete ajaxData.cgridName
				}
				$.ajax({
					type: "get",
					url: that.service + "/queryGridReportCountAndHandCount",
					dataType: 'json',
					data: ajaxData,
					success: function(res) {
						for(var i=0;i<res.data[0].length;i++){
							if(res.data[i+1]!=null){
								res.data[0][i].count2=res.data[i+1].count2
							}
						}
						function plusReady() {
							// 弹出系统等待对话框
							plus.nativeUI.closeWaiting();
						}
						if(window.plus) {
							plusReady();
						} else {
							document.addEventListener("plusready", plusReady, false);
						}
						that.mydata = res.data[0]
					}
				});
			},
			back: function() {
				this.$router.back()
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			navshow: function(num) {
				this.navboo = !this.navboo
				this.texttype = num
				console.log(num)
			},
			timeshow: function(type) {
				var that = this
				plus.nativeUI.pickDate(function(e) {
					var d = e.date;
					if(type == 0) {
						that.starttime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
					} else {
						that.endtime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
					}
				}, function(e) {
					console.log("未选择日期：" + e.message);
				});
			},
			gosearch: function() {
				if(this.starttime == '' || this.endtime == '') {
					this.navshow('0')
					this.alerttab()
					return
				}
			},
			alerttab: function() {
				this.alertboo = !this.alertboo
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	.tselect {
		background: #eeeeee;
		p {
			text-align: center;
		}
		table {
			width: 100%;
			background: white;
			td {
				height: .6rem;
				line-height: .6rem;
				font-size: .25rem;
				border: 1px solid #ECECEC;
				text-indent: .15rem;
			}
			tr:first-of-type {
				font-weight: 600;
				font-size: .25rem;
			}
		}
		.time-left {
			flex: 1;
			display: flex;
			flex-direction: column;
			.left-box {
				display: flex;
				align-items: center;
				margin: .1rem 0;
				justify-content: center;
			}
		}
		.time-box {
			height: auto;
			padding: .2rem 0;
		}
		.bottom-nav {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, .5);
			z-index: 999;
			.nav-group {
				position: absolute;
				bottom: 0;
				left: 0;
				background: white;
				width: 100%;
				.sub-nav {
					width: 100%;
					height: .7rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 1px solid ghostwhite;
				}
				.clear {
					background: #1e81d2;
					color: white;
					height: .8rem;
				}
				.active {
					background: #1e81d2;
					color: white;
				}
			}
		}
		.group img {
			height: .35rem;
		}
		.box-group .group {
			background: #FFFFFF;
			margin: .2rem 0;
			height: .8rem;
			display: flex;
			align-items: center;
			box-shadow: 0 2px 2px 2px gainsboro;
		}
		.riqi {
			display: flex;
			align-items: center;
			margin: 0 .2rem 0 .34rem;
		}
		.text {
			width: 4.4rem;
		}
		.width12 {
			width: .17rem;
			height: .17rem;
			border-radius: 50%;
			margin-right: .35rem;
		}
		.group:nth-of-type(1) .circle {
			background: blue;
		}
		.group:nth-of-type(2) .circle {
			background: yellow;
		}
		.group:nth-of-type(3) .circle {
			background: red;
		}
		.group:nth-of-type(4) .circle {
			background: pink;
		}
		.group:nth-of-type(5) .circle {
			background: peru;
		}
		.group:nth-of-type(6) .circle {
			background: green;
		}
		.back-group {
			background: white;
			width: 100%;
			margin-top: .15rem;
			box-shadow: 0 2px 2px 2px gainsboro;
			height: .95rem;
			display: flex;
			align-items: center;
			font-size: .25rem;
			.circle {
				width: .2rem;
				height: .2rem;
				border-radius: 50%;
				background: #00b7ee;
				margin: 0 .22rem 0 .34rem;
			}
			.date {
				width: 2rem;
			}
			&:nth-of-type(1n) .circle {
				background: #00b7ee;
			}
			&:nth-of-type(2n) .circle {
				background: #e39b00;
			}
			&:nth-of-type(3n) .circle {
				background: #ff5c5c;
			}
			&:nth-of-type(4n) .circle {
				background: #a8f247;
			}
			&:nth-of-type(5n) .circle {
				background: #a264ff;
			}
			&:nth-of-type(6n) .circle {
				background: #00b7ee;
			}
			&:nth-of-type(7n) .circle {
				background: #ff6262;
			}
			&:nth-of-type(8n) .circle {
				background: #b17dff;
			}
		}
		.wwang {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.grey {
				color: #8a8a8a;
				font-size: .2rem;
				font-weight: 400;
			}
		}
		.type {
			display: flex;
			align-items: center;
			img {
				height: .1rem!important;
				width: auto!important;
				margin: 0 .05rem!important;
			}
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
				font-size: .26rem;
				box-sizing: border-box;
				font-weight: 500;
				transition: all .3s;
				border-bottom: 2px solid #FFFFFF;
			}
			.active {
				color: #1e81d2;
				border-bottom: 2px solid #1e81d2;
			}
		}
		.time-box {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 1.1rem;
			.box {
				height: .5rem;
				border: 2px solid #1e81d2;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				img {
					height: .1rem;
					margin-left: .2rem;
				}
				input {
					width: 2rem!important;
					height: 100%;
					border: 0;
					text-align: center;
				}
			}
			.box-go {
				height: .5rem;
				background: #1e81d2;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: .1rem;
				img {
					height: .28rem;
					margin-right: .14rem;
				}
			}
			.hr {
				height: 2px;
				background: #1e81d2;
				width: .5rem;
			}
		}
		.select-group {
			background: white;
			padding-bottom: .3rem;
			margin-bottom: .24rem;
			.group-inner {
				margin: 0 .34rem;
			}
			.group-title {
				line-height: .8rem;
				font-size: .3rem;
				border-bottom: 1px solid #b8b8b8;
			}
		}
	}
</style>