<template>
	<div id="wrapper">
		<t-head></t-head>
		<div id="main">
			<d-map></d-map>
		</div>
		<h-foot></h-foot>
	</div>
</template>
<script>
	export default {
		name: 'hindex',
		data() {
			return {

			}
		},
		mounted() {
			this.$store.state.tfoot=1
		},
		methods: {
			opennew: function(target) {
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
			THead: resolve => require(['../tourists/thead'], resolve),
			HFoot: resolve => require(['./wfoot'], resolve),
			DMap: resolve => require(['../map'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">

</style>