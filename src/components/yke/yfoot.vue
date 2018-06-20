<template>
	<div id="foot">
		<div class="foot-nav" :class="tfoot==1?'fthis':''" @click="opennew('yindex',1)">
			<img src="../../../static/index01-active.png" class="factive" />
			<img src="../../../static/index01.png" class="fdefault" />
			<span>
    				首页
    			</span>
		</div>
		<div class="foot-nav" :class="tfoot==2?'fthis':''" @click="opennew('yselect',2)">
			<img src="../../../static/index02-active.png" class="factive" />
			<img src="../../../static/index02.png" class="fdefault" />
			<span>
    				案卷查询
    			</span>
		</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'yfoot',
		data() {
			return {

			}
		},
		components: {

		},
		mounted() {

		},
		methods: {
			opennew:function(target,index) {
				this.$store.state.tfoot=index
				this.$router.push({
					name: target
				})
			}
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			}
		}
	}
</script>

<style type="text/css" lang="scss">

</style>