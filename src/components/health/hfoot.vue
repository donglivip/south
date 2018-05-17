<template>
  <div id="foot">
	  	<div class="foot-nav" :class="tfoot==1?'fthis':''" @click="opennew('hindex')">
				<img src="../../../static/huan-guiji-active.png" class="factive" />
				<img src="../../../static/huan-guiji.png" class="fdefault" />
				<span>
	    			工作轨迹
	    	</span>
			</div>
			<div class="foot-nav" :class="tfoot==2?'fthis':''" @click="opennew('hwork')">
				<img src="../../../static/huan-gong-active.png" class="factive" />
				<img src="../../../static/huan-gong.png" class="fdefault" />
				<span>
	    			工作照
	    	</span>
			</div>
			<div class="foot-nav" :class="tfoot==3?'fthis':''" @click="opennew('hchange')">
				<img src="../../../static/huan-zheng-active.png" class="factive" />
				<img src="../../../static/huan-zheng.png" class="fdefault" />
				<span>
	    			整改照
	    	</span>
			</div>
			<div class="foot-nav" :class="tfoot==4?'fthis':''" @click="opennew('huser')">
				<img src="../../../static/user-user.png" class="factive" />
				<img src="../../../static/huan-wo.png" class="fdefault" />
				<span>
	    			我的
	    	</span>
			</div>
  </div>
</template>

<script>
export default {
  name: 'hfoot',
  data () {
    return {
      
    }
  },
  components:{
  	
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
  }
}
</script>

<style type="text/css" lang="scss">
	
</style>
