<template>
  <div id="wrapper" class="mygrid">
    	<div id="head">
				<span @click="back()">
					<img src="../../../static/back.png"/>
				</span>
				<div>美丽南钢</div>
				<span></span>
			</div>
    	<div id="main">
    		<div class="grid">
    			<div class="text">
    				网格001
    			</div>
    			<div class="title">
    				2018-05-15
    			</div>
    		</div>
    		<div class="grid">
    			<div class="text">
    				网格001
    			</div>
    			<div class="title">
    				2018-05-15
    			</div>
    		</div>
    	</div>
  </div>
</template>

<script>
export default {
  name: 'mygrid',
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
		},
		back:function(){
			this.$router.back()
		}
  },
  computed:{
  	tfoot(){
  		return this.$store.state.tfoot
  	}
  },
  components:{
  	THead:resolve => require(['../tourists/thead'],resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	.mygrid{
		.grid{
			width: calc(100% - .4rem);
			height: .7rem;
			box-shadow: 0 0 10px .1rem gainsboro;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
