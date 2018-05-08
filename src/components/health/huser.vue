<template>
  <div id="wrapper">
    	<t-head></t-head>
    	<div id="main">
    		
    	</div>
    	<t-foot>
    		
    	</t-foot>
  </div>
</template>

<script>
export default {
  name: 'huser',
  data () {
    return {
      
    }
  },
  mounted(){
  	this.$store.state.tfoot=4
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
  	THead:resolve => require(['../tourists/thead'],resolve),
  	TFoot:resolve => require(['./hfoot'],resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	
</style>
