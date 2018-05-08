<template>
	<div id="foot">
		<div class="foot-nav" :class="tfoot==1?'fthis':''" @click="opennew('tindex')">
			<img src="../../../static/index01-active.png" class="factive" />
			<img src="../../../static/index01.png" class="fdefault" />
			<span>
    				首页
    			</span>
		</div>
		<div class="foot-nav" :class="tfoot==2?'fthis':''" @click="opennew('tselect')">
			<img src="../../../static/index02-active.png" class="factive" />
			<img src="../../../static/index02.png" class="fdefault" />
			<span>
    				案卷调查
    			</span>
		</div>
		<div class="foot-nav" :class="tfoot==3?'fthis':''" @click="opennew('user')">
			<img src="../../../static/index03-active.png" class="factive" />
			<img src="../../../static/index03.png" class="fdefault" />
			<span>
    				我的
    			</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'dtfoot',
		data() {
			return {

			}
		},
		components: {

		},
		mounted() {

		},
		methods: {
			opennew:function(target) {
				this.$router.push({
					name: target
				})
			}
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			}
		},
		components: {
			THead: resolve => require(['./thead'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">

</style>