<template>
	<div id="wrapper" class="cbackdetail">
		<div id="head">
			<span @click="back">
    			<img src="../../static/back.png"/>
    		</span>
			<div>预处理案卷详情</div>
			<span></span>
		</div>
		<div id="main">
			<div class="detail-group">
				<div class="detail-inner">
					<img src="../../static/detail=adress.png" />
					<div class="detail-text">
						{{mydata[0].cmultipleCommunitiesName}} - {{mydata[0].cgridName}}
					</div>
				</div>
			</div>
			<div class="detail-group">
				<div class="detail-inner">
					<img src="../../static/anjuan.png" />
					<div class="detail-text">
						{{mydata[0].createTime1}}{{mydata[0].cuserName}}
					</div>
				</div>
				<div class="detail-inner">
					<img :src="mydata[0].cfileDealPrevImg1" class="big-img" />
				</div>
			</div>
			<div class="detail-group">
				<div class="detail-inner">
					<div class="detail-text">
						是否受理：
					</div>
					<div class="detail-arr">
						<div class="radio" @click="radiochange(1)">
							<div class="circle-box" :class="radioboo==1?'active':''">
								<div class="circle"></div>
							</div>
							<div class="text">
								受理
							</div>
						</div>
						<div class="radio" @click="radiochange(3)">
							<div class="circle-box" :class="radioboo==3?'active':''">
								<div class="circle"></div>
							</div>
							<div class="text">
								不受理
							</div>
						</div>
					</div>
				</div>
				<!--<div v-if="radioboo==3">-->
					<div class="detail-inner" @click="bottomshow(0)" v-if="radioboo==3">
						<div class="detail-text">
							不受理原因：
						</div>
						<div class="detail-arr">
							{{cnotAdmissibleReasontext}}
						</div>
						<img src="../../static/arrright.png" class="arrimg" />
					</div>
					<div class="detail-inner" @click="navshow">
						<div class="detail-text">
							案卷分类：
						</div>
						<div class="detail-arr">
							{{navtext}}
						</div>
						<img src="../../static/arrright.png" class="arrimg" />
					</div>
					<div class="detail-inner" @click="bottomshow(2)">
						<div class="detail-text">
							案卷时限：
						</div>
						<div class="detail-arr">
							{{cfinisedtext}}
						</div>
						<img src="../../static/arrright.png" class="arrimg" />
					</div>
				<!--</div>-->
			</div>
			<div class="godubmit" @click="godubmit">
				提交
			</div>
		</div>
		<transition name='nav'>
			<div class="bottom-nav" v-show="navboo" @click="bottomfalse">
				<div class="nav-group">
					<div class="sub-nav" v-for="(val,index) in noway" @click="bottomnav(val)">
						<span v-if="type==0">{{val.creasonContent}}</span>
						<span v-if="type==1">{{val.ctypeTitle}}</span>
						<span v-if="type==2">{{val.cfinisedTime}}</span>
					</div>
					<div class="sub-nav clear" @click.stop="bottomfalse">
						取消
					</div>
				</div>
			</div>
		</transition>
		<transition name='bottom'>
			<bottom-nav v-show='bottomboo' @navshow='navshow'></bottom-nav>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'ydetail',
		data() {
			return {
				navboo: false,
				radioboo: 1,
				mydata: '',
				noway: [],
				type: '',
				cnotAdmissibleReasontext: '请选择不受理原因',
				cnotAdmissibleReason: '',
				cfinisedtext: '请选择完成时限',
				cfinisedId: '',
				bottomboo: false,
				navtext: '请选择案卷分类'
			}
		},
		mounted() {
			this.myajax()

			function plusReady() {
				// 弹出系统等待对话框
				var w = plus.nativeUI.showWaiting("加载中...");
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener("plusready", plusReady, false);
			}
		},
		methods: {
			godubmit: function() {
				var that = this
				var ajaxdata = {
					cfileId: that.windexid,
					cfileResult: that.radioboo,
					cnotAdmissibleReason: that.cnotAdmissibleReason,
					cfinisedId: that.cfinisedId,
					ctypeTwoId: that.bottomtwoid,
					ctypeTitle:that.ctypeTitle
//					cuserIdNetwork: that.mydata[0].cuserIdNetwork,
//					cgridId: that.mydata[0].cgridId
				}
				if(that.radioboo == '') {
					delete ajaxdata.cfileResult
				}
				if(that.cnotAdmissibleReason == '') {
					delete ajaxdata.cnotAdmissibleReason
				}
				if(that.cfinisedId == '') {
					delete ajaxdata.cfinisedId
				}
				if(that.bottomtwoid == '') {
					delete ajaxdata.ctypeTwoId
				}
				$.ajax({
					type: "post",
					url: that.service + "/updateBycfilePreCase",
					dataType: 'json',
					data: ajaxdata,
					success: function(res) {
						if(res.status==200){
							that.$router.back()
						}else{
							plus.nativeUI.toast(res.data.msg)
						}
						
					}
				});
			},
			bottomnav: function(val) {
				if(this.type == 0) {
					this.cnotAdmissibleReasontext = val.creasonContent
					this.cnotAdmissibleReason = val.creasonId
				} else if(this.type == 1) {
					//					this.cfinisedId=val.
				} else {
					this.cfinisedtext = val.cfinisedTime
					this.cfinisedId = val.cfinisedId
				}
			},
			navshow: function(name) {
				this.navtext = name
				this.bottomboo = !this.bottomboo
			},
			bottomfalse: function() {
				this.navboo = !this.navboo
			},
			bottomshow: function(type) {
				var that = this
				if(type == 0) {
					$.ajax({
						type: "get",
						url: that.service + "/queryByListCreason",
						dataType: 'json',
						data: {
							cfileId: that.windexid
						},
						success: function(res) {
							that.noway = res.data
						}
					});
				} else if(type == 1) {
					$.ajax({
						type: "get",
						url: that.service + "/queryCtypeOne",
						dataType: 'json',
						success: function(res) {
							that.noway = res.data
						}
					});
				} else {
					$.ajax({
						type: "get",
						url: that.service + "/queryListCfinished",
						dataType: 'json',
						success: function(res) {
							that.noway = res.data
						}
					});
				}
				this.type = type
				this.navboo = !this.navboo
			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "get",
					url: that.service + "/queryListByCfileId",
					dataType: 'json',
					data: {
						cfileId: that.windexid
					},
					success: function(res) {
						console.log(res)
						that.mydata = res.data

						function plusReady() {
							// 弹出系统等待对话框
							var w = plus.nativeUI.closeWaiting()
						}
						if(window.plus) {
							plusReady();
						} else {
							document.addEventListener("plusready", plusReady, false);
						}
					}
				});

			},
			radiochange: function(id) {
				this.radioboo = id
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			back: function() {
				this.$router.back()
			}
		},
		components: {
			BottomNav: resolve => require(['./bottom-nav'], resolve)
		},
		computed: {
			windexid() {
				return this.$store.state.windexid;
			},
			service() {
				return this.$store.state.service;
			},
			bottomtwoid() {
				return this.$store.state.bottomtwoid
			},
			ctypeTitle(){
				return this.$store.state.ctypeTitle
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	.cbackdetail {
		.radio {
			display: flex;
			align-items: center;
			margin-right: .3rem;
			.circle-box {
				width: .36rem;
				height: .36rem;
				border-radius: 50%;
				border: 1px solid #959595;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: .14rem;
				.circle {
					width: .2rem;
					height: .2rem;
					border-radius: 50%;
					display: none;
					background: #1e81d2;
				}
			}
			.active {
				border-color: #1e81d2;
				.circle {
					display: block;
				}
			}
		}
		.detail-arr {
			display: flex;
		}
		background: #EEEEEE;
		.godubmit {
			background: #1e81d2;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: .1rem;
			margin: .6rem .34rem .3rem;
			height: .9rem;
		}
		.arrimg {
			margin-left: .15rem;
		}
		.detail-group {
			background: white;
			margin-bottom: .22rem;
			border-bottom: 1px solid #d4d3d4;
			.detail-inner {
				margin: 0 .34rem;
				display: flex;
				align-items: center;
				padding: .3rem 0;
				border-bottom: 1px solid #d4d3d4;
				&:last-of-type {
					border: 0;
				}
				img {
					height: .25rem;
					margin-right: .25rem;
				}
				.big-img {
					width: 3.8rem;
					height: auto;
					display: block;
					margin: .25rem auto;
				}
				.detail-text {
					flex: 1;
				}
			}
		}
	}
</style>