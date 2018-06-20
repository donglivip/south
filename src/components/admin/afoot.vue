<template>
	<div id="foot">
		<div class="foot-nav" :class="tfoot==2?'fthis':''" @click="opennew('asearch',2)">
			<img src="../../../static/c-ji-active.png" class="factive" />
			<img src="../../../static/c-ji.png" class="fdefault" />
			<span>
	    			轨迹查询
	    	</span>
		</div>
		<div class="foot-nav" :class="tfoot==3?'fthis':''" @click="opennew('ajuan',3)">
			<img src="../../../static/c-pai-active.png" class="factive" />
			<img src="../../../static/c-pai.png" class="fdefault" />
			<span>
	    			案卷派发
	    	</span>
		</div>
		<div class="foot-nav" :class="tfoot==4?'fthis':''" @click="opennew('acan',4)">
			<img src="../../../static/c-pai-active.png" class="factive" />
			<img src="../../../static/c-pai.png" class="fdefault" />
			<span>
	    			案卷查询
	    	</span>
		</div>
		<div class="foot-nav" :class="tfoot==5?'fthis':''" @click="opennew('auser',5)">
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
		name: 'afoot',
		data() {
			return {

			}
		},
		components: {

		},
		mounted() {
			
		},
		methods: {
			opennew:function(target,index){
		this.$store.state.tfoot=index
		this.$router.push({
			name:target
		})
	}
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			},
			typefoot() {
				return this.$store.state.typefoot
			},
			service() {
				return this.$store.state.service
			}
		}
	}
</script>

<style type="text/css" lang="scss">

</style>