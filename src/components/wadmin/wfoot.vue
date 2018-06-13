<template>
	<div id="foot">
		<div class="foot-nav" :class="tfoot==1?'fthis':''" @click="opennew('windex',1)">
			<img src="../../../static/c-ji-active.png" class="factive" />
			<img src="../../../static/c-ji.png" class="fdefault" />
			<span>
    			工作记录
    		</span>
		</div>
		<div class="foot-nav" :class="tfoot==2?'fthis':''" @click="opennew('wwang',2)">
			<img src="../../../static/wge-active.png" class="factive" />
			<img src="../../../static/wge.png" class="fdefault" />
			<span>
    			网格案卷
    		</span>
		</div>
		<div class="foot-nav" :class="tfoot==3?'fthis':''" @click="opennew('wuser',3)">
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
		name: 'wfoot',
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