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
		<div id="main">
			<div class="tselect-top">
				<div class="top-nav" :class="swiperindex==0?'active':''" @click="toswiper(0)">
					预处理案卷
				</div>
				<div class="top-nav" :class="swiperindex==1?'active':''" @click="toswiper(1)">
					待处理案卷
				</div>
				<div class="top-nav" :class="swiperindex==2?'active':''" @click="toswiper(2)">
					已处理案卷
				</div>
			</div>
			<swiper :options="swiperOption" ref="mySwiper" class='swiper-no-swiping'>
				<!-- 这部分放你要渲染的那些内容 -->
				<swiper-slide>
					<div class="select-group workcamera" style="background: none;">
						<div class="box-group">
							<div class="group" v-for="val in mydata" v-if="val.cfileResult==0" @click="opennew('ydetail',val.cfileId)">
								<div class="riqi">
									<div class="circle width12"></div>
									<span style="width: auto;">{{val.createTime1}}</span>
								</div>
								<span class="text">{{val.cmultipleCommunitiesName}}{{val.cgridName}}</span>
								<img src="../../../static/shanchu.png" @click.stop="filephotod(val.cfileId)" style="margin-right: .2rem;"/>
							</div>
							<p v-if='mydata.length==0'>
								暂无案卷
							</p>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="select-group" v-for="(val,index) in mydata" v-if="val.cfileResult==1" @click="opennew('changedetail',val.cfileId)">
						<div class="group-inner">
							<div class="group-title">
								{{val.createTime1}}{{val.cgridName}}
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
										<img src="../../../static/uploadselect.png" /></div>
									<div class="state">
										待上传
									</div>
								</div>
							</div>
						</div>
					</div>
					<p v-if='mydata.length==0'>
						暂无案卷
					</p>
				</swiper-slide>
				<swiper-slide>
					<div class="select-group" v-for="(val,index) in mydata" v-if="val.cfileResult==2" @click="opennew('changedetail',val.cfileId)">
						<div class="group-inner">
							<div class="group-title">
								{{val.createTime1}}{{val.cgridName}}
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
										<img :src="val.cfileDealAfterImg1 | myimg" /></div>
									<div class="state wwang">
										<span>整改后</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<p v-if='mydata.length==0'>
						暂无案卷
					</p>
				</swiper-slide>
			</swiper>
		</div>
		<t-foot></t-foot>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'wwang',
		data() {
			return {
				swiperOption: {},
				swiperindex: 0,
				defaultDate: new Date(),
				starttime: '',
				endtime: '',
				startshow: false,
				timety: 0,
				alertboo: false,
				uploadtarget: '',
				navboo: false,
				navtext: '分类',
				server: '',
				files: [],
				mydata: '',
				cfileDealAfterImg1: ''
			}
		},
		components: {
			swiper,
			swiperSlide,
			THead: resolve => require(['../tourists/thead'], resolve),
			TFoot: resolve => require(['./wfoot'], resolve),
		},
		mounted() {
			this.$store.state.tfoot = 2
			this.server = this.service + '/uploadworkImage'
			this.myajax()
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
			service() {
				return this.$store.state.service;
			},
			windexid() {
				return this.$store.state.windexid;
			}
		},
		methods: {
			filephotod: function(id) {
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
					// 显示自动消失的提示消息
					plus.nativeUI.showWaiting('数据较多，可能加载较慢，请耐心等待~')
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
				var that = this
				$.ajax({
					type: "get",
					url: that.service + "/queryListByCuserIdNetwork",
					dataType: 'json',
					data: {
						cuserIdNetwork: localStorage.getItem('userid')
					},
					success: function(res) {
						console.log(res)
						that.mydata = res.data[0]
						plus.nativeUI.closeWaiting()
					},
					error: function(err) {
						console.log(err)
					}
				});
			},
			opennew: function(target, id) {
				this.$store.state.windexid = id
				this.$router.push({
					name: target
				})
			},
			navshow: function(id) {
				this.navboo = !this.navboo
				this.navtext = id
			},
			toswiper: function(index) {
				this.swiperindex = index
				this.swiper.slideTo(index, 1000, false)
			},
			startchang: function(date, formatDate) {
				if(this.timety == 0) {
					this.starttime = formatDate
				} else {
					this.endtime = formatDate
				}

			},
			timeshow: function(type) {
				this.startshow = true
				this.timety = type
			},
			gosearch: function() {
				if(this.starttime == '' || this.endtime == '') {
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
			line-height: 1rem;
		}
		.swiper-container {
			margin-top: .2rem;
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
					line-height: .4rem;
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