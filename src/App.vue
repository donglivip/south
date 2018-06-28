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
				transitionName: 'slide-left'
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
			var that=this
			function plusReady(){
				plus.key.addEventListener("backbutton", function() {
					that.$router.back()
				})
			}
			if(window.plus){
				plusReady();
			}else{
				document.addEventListener("plusready",plusReady,false);
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