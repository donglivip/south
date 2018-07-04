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
				set: ''
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
			},
			havenew: function() {
				var that = this
				that.set = setInterval(function() {
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
//									判断是案卷消息
									if(res.data[i].stystemSatus == 1) {
										var mm1 = (parseInt(new Date().Format("ss")) - 5).toString();
										if(mm1.length == 1) {
											mm1 = '0' + mm1
										};
										var testdate = res.data[i].createTime1;
										var startDateString = new Date().Format("yyyy-MM-dd hh:mm:" + mm1 + "");
										var endDateString = new Date().Format("yyyy-MM-dd hh:mm:ss");
										var cfileId=res.data[i].cfileId;
//										判断是否在指定时间内
										if(new Date(testdate) > new Date(startDateString) && new Date(testdate) < new Date(endDateString)) {
//											推送消息
											var info = plus.push.getClientInfo();
											plus.push.createMessage('您有新的案卷需要处理,请点击查看!');
//											点击事件
											plus.push.addEventListener("click", function(msg) {
												plus.nativeUI.showWaiting('消息处理中')
												$.ajax({
													type: "post",
													url: that.service + "/queryListByCfileId",
													dataType: 'json',
													data: {
														cfileId: cfileId
													},
													success:function(res){
														plus.nativeUI.closeWaiting()
														if(res.data[0].cfileResult == 1){
															that.$store.state.windexid = cfileId
															that.$router.push({
																name: 'changedetail'
															})
														}else if(res.data[0].cfileResult == 0&&localStorage.getItem('cuserRole')==4){
															that.$store.state.windexid = cfileId
															that.$router.push({
																name: 'ydetail'
															})
														}else{
															that.$store.state.windexid = cfileId
															that.$router.push({
																name: 'changedetail'
															})
														}
													},
													error:function(){
														plus.nativeUI.alert('消息读取错误！')
													}
												})
											}, false);
										}
									}
								}
							}
						}
					});
				}, 3000)
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
			that.havenew()
			function plusReady() {
				plus.key.addEventListener("backbutton", function() {
					that.$router.back()
				})
				plus.navigator.setStatusBarBackground('#1e81d2');
				document.addEventListener("pause", function() {
					plus.nativeUI.toast('程序在后台运行')
				}, false);
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener("plusready", plusReady, false);
			}

		},
		computed:{
			service() {
				return this.$store.state.service
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