<template>
  <div id="wrapper">
    	<t-head></t-head>
    	<div id="main">
    		
    	</div>
    	<t-foot></t-foot>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      
    }
  },
  mounted(){
  
  },
  methods:{
	opennew:function(target){
		this.$router.push({
			name:target
		})
	}
  },
  computed:{
  	tfoot(){
  		return this.$store.state.tfoot
  	}
  },
  components:{
  	THead:resolve => require(['./thead'],resolve),
  	TFoot:resolve => require(['./tfoot'],resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	
</style>
