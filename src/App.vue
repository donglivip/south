<template>
	<div id="app">
		<transition :name="transitionName">
			<div class="wrapper">
				<!--<keep-alive>-->
				<router-view class="child-view"></router-view>
				<!--</keep-alive>-->
				<!--<router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>-->
			</div>
		</transition>
	</div>
</template>
<script>
	export default {
		name: 'App',
		data() {
			return {
				transitionName: 'slide-left',
				set:''
			}
		},
		methods: {
			opennew(target) {
				this.$router.push({
					name: '' + target + '',
					params: {
						id: 2,
						status: 1
					}
				});
			}
		},
		watch: {
			'$route' (to, from) {
				if(to.path == '/') {
					this.transitionName = 'slide-right';
				} else {
					this.transitionName = 'slide-left';
				}
			}
		},
		mounted() {
			var that = this
			function plusReady() {
				plus.key.addEventListener("backbutton", function() {
					that.$router.back()
				})
				plus.navigator.setStatusBarBackground('#1e81d2');
				document.addEventListener("pause", function() {
					plus.nativeUI.toast('程序在后台运行')
					that.set=setInterval(function() {
						var that=this
						$.ajax({
							type: "get",
							url: that.service + "/queryCuserMessagePojoByCuserId",
							dataType: 'json',
							data: {
								cuserId: localStorage.getItem('userid')
							},
							success: function(res) {
								if(res.data.length > 0) {
									for(var i = 0; i < res.data.length; i++) {
										if((res.data[i].stystemSatus == 1 || res.data[i].stystemSatus == 2) && res.data[i].status != 1) {
											var mm1 = (parseInt(new Date().Format("ss")) - 5).toString();
											if(mm1.length == 1) {
												mm1 = '0' + mm1
											};
											var testdate = res.data[i].createTime1;
											var startDateString = new Date().Format("yyyy-MM-dd hh:mm:" + mm1 + "");
											var endDateString = new Date().Format("yyyy-MM-dd hh:mm:ss");
											if(new Date(testdate) > new Date(startDateString) && new Date(testdate) < new Date(endDateString)) {
												var info = plus.push.getClientInfo();
												plus.push.createMessage('您有新的案卷需要处理,请点击查看!');
												var type = res.data[i].stystemSatus
												plus.push.addEventListener("click", function(msg) {
													$.ajax({
														type: "post",
														url: that.service + "/updateCuserCmessageByPrimaryKeySelective",
														dataType: 'json',
														data: {
															cmessageId: res.data[i].cmessageId,
															cuserCmessageId: res.data[i].cuserCmessageId
														},
														success: function(res) {
															if(res.status == 200) {
																that.$store.state.windexid = res.data[i].cfileId
																if(type == 1) {
																	that.$router.push({
																		name: 'ydetail'
																	})
																} else {
																	that.$router.push({
																		name: 'changedetail'
																	})
																}
															} else {
																plus.nativeUI.toast('消息读取错误')
															}
														},
														error: function(error) {
															console.log(JSON.stringify(res))
														}
													});
												}, false);
											}
										}
									}
								}
							}
						});
					}, 3000)
				}, false);
				document.addEventListener("resume", function () {
				    clearInterval(that.set)
				}, false)
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener("plusready", plusReady, false);
			}

		}
	}
</script>

<style lang="scss">
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(100%, 0);
		transform: translate(100%, 0);
	}
	
	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		-webkit-transform: translate(-100%, 0);
		transform: translate(-100% 0);
	}
</style>