<template>
	<div id="wrapper" class="tselect">
		<transition name='alert'>
			<div class="alert" v-show="alertboo" @click="alerttab">
				<div class="alert-inner">
					<div class="alert-text">
						至少输入开始时间
					</div>
					<div class="alert-setting">
						<div class="setting-group">
							确定
						</div>
					</div>
				</div>
			</div>
		</transition>
		<t-head></t-head>
		<div id="main">
			<div class="time-box">
				<div class="box" @click="timeshow(0)">
					{{starttime==''?'开始时间':starttime}}
					<img src="../../../static/arrbottom.png" />
				</div>
				<span class="hr"></span>
				<div class="box" @click="timeshow(1)">
					{{endtime==''?'结束时间':endtime}}
					<img src="../../../static/arrbottom.png" />
				</div>
				<div class="box-go" @click="myajax(0)">
					<img src="../../../static/search.png" /> 搜索
				</div>
			</div>
			<div class="select-group" v-for="val in list" @click="opennew('changedetail',val.cfileId)">
				<div class="group-inner">
					<div class="group-title">
						{{val.createTime1}} {{val.cmultipleCommunitiesName}}  {{val.cgridName}}
					</div>
					<div class="img-box">
						<div class="img-group" style="width: 100%;">
							<div class="myimg-box">
								<img :src="val.cfileDealPrevImg1 | myimg" /></div>
						</div>
					</div>
				</div>
			</div>
			<div class="more"  @click="myajax()" v-if="pageNum&lt;mydata.lastPage">点击加载更多</div>
			<div class="more"  v-if="pageNum&gt;mydata.lastPage||pageNum==mydata.lastPage">没有更多啦~</div>
			<p v-if="mydata.length==0">
				暂无案卷
			</p>
		</div>
		<transition name='nav'>
			<bootom-nav v-show='navboo' v-on:navshow='navshow'></bootom-nav>
		</transition>
		<t-foot></t-foot>
	</div>
</template>

<script>
	export default {
		name: 'yselect',
		data() {
			return {
				starttime: '',
				endtime: '',
				startshow: false,
				timety: 0,
				alertboo: false,
				uploadtarget: '',
				navboo: false,
				navtext: '分类',
				mydata: [],
				cuserCode: '',
				pageNum:0,
				pageSize:10,
				list:[]
			}
		},
		components: {
			THead: resolve => require(['../tourists/head'], resolve),
			TFoot: resolve => require(['./yfoot'], resolve),
			BootomNav: resolve => require(['../bottom-nav'], resolve)
		},
		mounted() {
			var that = this
			this.$store.state.tfoot = 2
			this.myajax(0)
		},
		computed: {
			service() {
				return this.$store.state.service;
			},
			uuid() {
				return this.$store.state.uuid
			}
		},
		methods: {
			opennew: function(target, id) {
				this.$store.state.windexid = id
				this.$router.push({
					name: target
				})
			},
			myajax: function(type) {
				this.pageNum++
				var that = this
				function plusReady() {
					plus.nativeUI.showWaiting("数据加载中...");
					var ajaxJson = {
						cuserCode: that.uuid,
						cfileResult: type,
						createTime1: that.starttime,
						handingTime1: that.endtime,
						pageNum:that.pageNum,
						pageSize:that.pageSize
					}
					if(that.starttime == '') {
						delete ajaxJson.createTime1
					}
					if(that.endtime == '') {
						delete ajaxJson.handingTime1
					}
					console.log(ajaxJson)
					$.ajax({
						type: "post",
						url: that.service + "/queryByCfilePojo",
						dataType: 'json',
						data: ajaxJson,
						success: function(res) {
							console.log(res)
							that.mydata=res.data
							for (var i=0;i<res.data.list.length;i++) {
								that.list.push(res.data.list[i])
							}
							
							console.log(that.list)
							function plusReady() {
								// 弹出系统等待对话框
								plus.nativeUI.closeWaiting();
							}
							if(window.plus) {
								plusReady();
							} else {
								document.addEventListener("plusready", plusReady, false);
							}
						}
					});
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
			},
			navshow: function(id) {
				this.navboo = !this.navboo
				this.navtext = id
			},
			toswiper: function(index) {
				this.swiperindex = index
				this.swiper.slideTo(index, 1000, false)
				if(index == 0) {
					this.myajax(2)
				} else {
					this.myajax(0)
				}
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
			height: 1.1rem;
			padding-left: .3rem;
			.box {
				height: .5rem;
				width: 2rem;
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
			}
			.box-go {
				width: 1.5rem;
				height: .5rem;
				background: #1e81d2;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 .3rem 0 .4rem;
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
			.img-box {
				display: flex;
				justify-content: space-between;
				.state {
					line-height: .5rem;
					text-align: center;
					border: 1px solid #b8b8b8;
					border-top: 0;
					margin-top: -2px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.upload {
					background: #eeeeee;
					padding: 0 .25rem;
					color: gray;
					height: .35rem;
					line-height: .35rem;
					margin-left: .3rem;
				}
			}
		}
	}
</style>