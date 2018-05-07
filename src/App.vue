<template>
	<div id="app">
		<transition :name="transitionName">
			<router-view class="child-view"></router-view>
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
		}
	}
</script>

<style lang="scss">
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(30px, 0);
		transform: translate(30px, 0);
	}
	
	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		-webkit-transform: translate(-30px, 0);
		transform: translate(-30px, 0);
	}
</style>