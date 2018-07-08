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
		<t-head></t-head>
		<div id="main" style="height: calc(100% - 1.6rem);">
			<div class="tselect-top">
				<div class="top-nav" :class="swiperindex==0?'active':''" @click="toswiper(0)">
					退回案卷
				</div>
				<!--<div class="top-nav" :class="swiperindex==0?'active':''" @click="toswiper(0)">
					未受理案卷
				</div>-->
				<div class="top-nav" :class="swiperindex==1?'active':''" @click="toswiper(1)">
					未整改案卷
				</div>
				<div class="top-nav" :class="swiperindex==2?'active':''" @click="toswiper(2)">
					已整改案卷
				</div>
			</div>
			<div class="time-box">
				<div class="time-left">
					<div class="left-box">
						<div class="box" @click="navshow('0')">
							{{community}}
							<img src="../../../static/arrbottom.png" />
						</div>
						<span class="hr"></span>
						<div class="box" @click="navshow('1')">
							{{grid}}
							<img src="../../../static/arrbottom.png" />
						</div>
						<div class="box-go" @click="navshow('2')">
							{{navtext}}
						</div>
					</div>
					<div class="left-box">
						<div class="box" @click="timeshow(0)">
							{{starttime==''?'开始时间':starttime}}
							<img src="../../../static/arrbottom.png" />
						</div>
						<span class="hr"></span>
						<div class="box" @click="timeshow(1)">
							{{endtime==''?'结束时间':endtime}}
							<img src="../../../static/arrbottom.png" />
						</div>
						<div class="box-go" @click="myajax">
							搜索
						</div>
					</div>

				</div>

			</div>
			<swiper :options="swiperOption" ref="mySwiper" class='swiper-no-swiping'>
				<!-- 这部分放你要渲染的那些内容 -->
				<!--<swiper-slide>
					<div class="box-group" v-for="val in mydata" v-if="val.cfileResult==0" @click="opennew('ydetail',val.cfileId)">
						<div class="group">
							<div class="riqi">
								<div class="circle width12"></div>
								<span style="width: auto;white-space: nowrap;">{{val.createTime1}}</span>
							</div>
							<span class="text">{{val.cmultipleCommunitiesName}}{{val.cgridName}}</span>
							<img src="../../../static/shanchu.png" @click.stop="workphotod(val.cfileId)" style="margin-right: .2rem;"/>
						</div>
					</div>
				</swiper-slide>-->
				<!--退回-->
				<swiper-slide>
					<div class="box-group">
						<div class="group" @click="opennew('cbackdetail',val.cfileId)" v-for="val in mydata" v-if="val.cfileResult==3">
							<div class="riqi">
								<div class="circle width12"></div>
								<span style="width: auto;white-space: nowrap;">{{val.createTime1}}</span>
							</div>
							<span class="text">{{val.cmultipleCommunitiesName}}{{val.cgridName}}</span>
							<img src="../../../static/shanchu.png" @click.stop="workphotod(val.cfileId)" style="margin-right: .2rem;"/>
						</div>
					</div>
				</swiper-slide>
				<!--未整改-->
				<swiper-slide>
					<div class="select-group" v-for="(val,index) in mydata" v-if="val.cfileResult==1||val.cfileResult==0" @click="opennew('changedetail',val.cfileId)">
						<div class="group-inner">
							<div class="group-title">
								{{val.createTime1}}案卷-{{val.cmultipleCommunitiesName}}{{val.cgridName}}
							</div>
							<div class="img-box">
								<div class="img-group">
									<div class="myimg-box">
										<img :src="val.cfileDealPrevImg1 | myimg" /></div>
									<div class="state wwang">
										<span>整改前</span>
									</div>
								</div>
								<div class="img-group">
									<div class="myimg-box">
										<img src="../../../static/uploadselect.png"/></div>
									<div class="state">
										上传图片
									</div>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
				<!--已整改-->
				<swiper-slide>
					<div class="select-group" @click="opennew('changedetail',val.cfileId)" v-for="val in mydata" v-if="val.cfileResult==2">
						<div class="group-inner">
							<div class="group-title">
								{{val.createTime1}}案卷-{{val.cmultipleCommunitiesName}}{{val.cgridName}}
							</div>
							<div class="img-box">
								<div class="img-group">
									<div class="myimg-box">
										<img :src="val.cfileDealPrevImg1 | myimg" />
									</div>
									<div class="state wwang">
										<span>整改前</span>
									</div>
								</div>
								<div class="img-group">
									<div class="myimg-box">
										<img :src="val.cfileDealAfterImg1 | myimg" />
									</div>
									<div class="state wwang">
										<span>整改后</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
				
			</swiper>
		</div>
		<transition name='nav'>
			<div class="bottom-nav" v-show="navboo" @click="navshow(0)">
				<div class="nav-group" v-if="texttype==2">
					<div class="sub-nav" v-for="(val,index) in bottomdata" @click.stop="navchange(val.ctypeTitle,val.ctypeId)" :class="navindex==index?'active':''">
						{{val.ctypeTitle}}
					</div>
					<div class="sub-nav clear">
						取消
					</div>
				</div>
				<div class="nav-group" v-if="texttype==0">
					<div class="sub-nav" v-for="(val,index) in bottomdata" @click.stop="navchange(val.cmultipleCommunitiesName,val.cmultipleCommunitiesId)" :class="navindex==index?'active':''">
						{{val.cmultipleCommunitiesName}}
					</div>
					<div class="sub-nav clear">
						取消
					</div>
				</div>
				<div class="nav-group" v-if="texttype==1">
					<div class="sub-nav" v-for="(val,index) in bottomdata" @click.stop="navchange(val.cgridName,val.cgridId)" :class="navindex==index?'active':''">
						{{val.cgridName}}
					</div>
					<div class="sub-nav clear">
						取消
					</div>
				</div>
			</div>
		</transition>
		<t-foot></t-foot>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'can',
		data() {
			return {
				swiperOption: {},
				swiperindex: 0,
				starttime: '',
				endtime: '',
				startshow: false,
				timety: 0,
				alertboo: false,
				uploadtarget: '',
				navboo: false,
				navtext: '选择分类',
				navindex: -1,
				community: '选择社区',
				communityid: '',
				grid: '选择网格',
				gridid: '',
				texttype: '0',
				bottomdata: [],
				mydata: [],
				files: [],
				cfileDealAfterImg1: ''
			}
		},
		components: {
			swiper,
			swiperSlide,
			THead: resolve => require(['../tourists/thead'], resolve),
			TFoot: resolve => require(['./afoot'], resolve)
		},
		mounted() {
			this.myajax()
			this.server = this.service + '/uploadworkImage'
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
			service() {
				return this.$store.state.service
			},
			bottomtwoid() {
				return this.$store.state.bottomtwoid
			}
		},
		methods: {
			imgok: function(id) {
				var that = this
				if(that.cfileDealAfterImg1 == '') {
					function plusReady() {
						// 显示自动消失的提示消息
						plus.nativeUI.toast("请点击图片选择上传的图片后再上传");
					}
					if(window.plus) {
						plusReady();
					} else {
						document.addEventListener("plusready", plusReady, false);
					}
					return false;
				}
				$.ajax({
					type: "post",
					url: that.service + "/updateCfileAndCuserCase",
					dataType: 'json',
					data: {
						userId: localStorage.getItem('userid'),
						cfileId: id,
						cfileDealAfterImg1: that.cfileDealAfterImg1
					},
					success: function(res) {
						that.myajax(2)
						that.toswiper(0)
					}
				});
			},
			workphotod: function(id) {
				var that = this
				var btnArray = [{
					title: "删除"
				}, ]; //选择按钮  1 2 3
				plus.nativeUI.actionSheet({
					title: "请选择",
					cancel: "取消",
					buttons: btnArray
				}, function(e) {
					var index = e.index;
					switch(index) {
						case 1:
							$.ajax({
								type: "post",
								url: that.service + "/deleteCorkByCfileId",
								dataType: 'json',
								data: {
									cfileId: id
								},
								success: function(res) {
									if(res.status == 200) {
										function plusReady() {
											// 显示自动消失的提示消息
											plus.nativeUI.toast("删除完成！");
											that.myajax()
										}
										if(window.plus) {
											plusReady();
										} else {
											document.addEventListener("plusready", plusReady, false);
										}
									} else {
										function plusReady() {
											// 显示自动消失的提示消息
											plus.nativeUI.toast("删除失败!");
										}
										if(window.plus) {
											plusReady();
										} else {
											document.addEventListener("plusready", plusReady, false);
										}

									}
								}
							});
							break;
					}
				});

			},
			myajax: function() {
				function plusReady() {
					// 弹出系统等待对话框
					var w = plus.nativeUI.showWaiting("数据加载中，可能用时较长，请耐心等待。。。");
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
				var that = this
				var dataJson = {
					createTime1: that.starttime,
					handingTime1: that.endtime,
					ctypeId: that.navid,
					cgridId: that.gridid,
					cmultipleCommunitiesId: that.communityid
				}
				if(that.starttime == '') {
					delete dataJson.createTime1
				}
				if(that.endtime == '') {
					delete dataJson.handingTime1
				}
				if(that.navid == '') {
					delete dataJson.ctypeId
				}
				if(that.gridid == '') {
					delete dataJson.cgridId
				}
				if(that.communityid == '') {
					delete dataJson.cmultipleCommunitiesId
				}
				$.ajax({
					type: "post",
					url: that.service + "/queryReturnFile",
					dataType: 'json',
					data: dataJson,
					success: function(res) {
						that.mydata=res.data
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
			},
			back: function() {
				this.$router.back()
			},
			navchange: function(id, index) {
				this.navindex = index
				if(this.texttype == 0) {
					this.community = id
					this.communityid = index
				} else if(this.texttype == 1) {
					this.grid = id
					this.gridid = index
				} else {
					this.navtext = id
					this.navid = index
				}
				this.navboo = !this.navboo
			},
			opennew: function(target, id) {
				this.$store.state.windexid = id
				this.$router.push({
					name: target
				})
			},
			navshow: function(num) {
				var that = this
				if(num == 2) {
					$.ajax({
						type: "post",
						url: that.service + "/queryCtypeOne",
						dataType: 'json',
						success: function(res) {
							that.bottomdata = res.data
							that.navboo = !that.navboo
							that.texttype = num
						}
					});
				} else if(num == 0) {
					//					社区
					$.ajax({
						type: "post",
						url: that.service + "/queryCmultipleCommunities",
						dataType: 'json',
						success: function(res) {
							that.bottomdata = res.data
							that.navboo = !that.navboo
							that.texttype = num
						}
					});
				} else if(num == 1) {
					if(that.communityid == '') {
						plus.nativeUI.toast("请先选择社区!");
						return false;
					}
					//					网格
					$.ajax({
						type: "post",
						url: that.service + "/queryByCmultipleCommunitiesId",
						dataType: 'json',
						data: {
							cmultipleCommunitiesId: that.communityid
						},
						success: function(res) {
							that.bottomdata = res.data
							that.navboo = !that.navboo
							that.texttype = num
						}
					});
				}
				
			},
			toswiper: function(index) {
				this.swiperindex = index
				this.swiper.slideTo(index, 1000, false)
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
		.group img {
			margin-right: .2rem;
		}
		background: #eeeeee;
		#main {
			height: calc(100% - .7rem);
		}
		.time-left {
			flex: 1;
			display: flex;
			flex-direction: column;
			.left-box {
				display: flex;
				align-items: center;
				margin: .1rem 0;
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
					font-size: .25rem;
					font-weight: 600;
				}
				.upload {
					background: #eeeeee;
					padding: .05rem .25rem;
					color: gray;
					height: .35rem;
					line-height: .35rem;
				}
			}
		}
	}
</style>