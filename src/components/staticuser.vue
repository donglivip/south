<template>
  <div id="wrapper">
    	<div id="head">
				<span @click="back">
					<img src="../../static/back.png"/>
				</span>
				<div>美丽南钢</div>
				<span></span>
			</div>
    	<div id="main">
    		
    	</div>
    	<t-foot>
    		
    	</t-foot>
  </div>
</template>

<script>
export default {
  name: 'staticuser',
  data () {
    return {
      
    }
  },
  mounted(){
  
  },
  methods:{
  	back:function(){
				this.$router.back()
		},
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
  	
  }
}
</script>

<style type="text/css" lang="scss">
	
</style>
