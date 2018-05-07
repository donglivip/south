<template>
  <div id="head">
    	<span v-show="!thead">登陆</span>
    	<div>美丽南钢</div>
    	<span v-show="!thead">注册</span>
  </div>
</template>

<script>
export default {
  name: 'thead',
  data () {
    return {
      
    }
  },
  computed:{
  	thead(){
  		return this.$store.state.thead
  	}
  }
}
</script>

<style type="text/css" lang="scss">
	
</style>
