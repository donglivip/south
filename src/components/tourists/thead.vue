<template>
	<div id="head">
		<span v-show="thead" @click="opennew('login')">登陆</span>
		<div>美丽南钢</div>
		<span v-show="thead" @click="opennew('register')">注册</span>
	</div>
</template>

<script>
	export default {
		name: 'dthead',
		data() {
			return {
				thead: ''
			}
		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			}
		},
		mounted(){
			if(localStorage.getItem('userid')==null){
				this.thead=false
			}else{
				this.thead=true
			}
		}
	}
</script>

<style type="text/css" lang="scss">

</style>