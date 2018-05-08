<template>
  <div id="foot">
	  	<div class="foot-nav" :class="tfoot==1?'fthis':''" @click="opennew('cindex')">
				<img src="../../../static/c-gui-active.png" class="factive" />
				<img src="../../../static/c-gui.png" class="fdefault" />
				<span>
	    			工作轨迹
	    	</span>
			</div>
			<div class="foot-nav" :class="tfoot==2?'fthis':''" @click="opennew('tindex')">
				<img src="../../../static/c-ji-active.png" class="factive" />
				<img src="../../../static/c-ji.png" class="fdefault" />
				<span>
	    			轨迹查询
	    	</span>
			</div>
			<div class="foot-nav" :class="tfoot==3?'fthis':''" @click="opennew('tindex')">
				<img src="../../../static/c-pai-active.png" class="factive" />
				<img src="../../../static/c-pai.png" class="fdefault" />
				<span>
	    			案卷派发
	    	</span>
			</div>
			<div class="foot-nav" :class="tfoot==4?'fthis':''" @click="opennew('tindex')">
				<img src="../../../static/c-pai-active.png" class="factive" />
				<img src="../../../static/c-pai.png" class="fdefault" />
				<span>
	    			案卷查询
	    	</span>
			</div>
			<div class="foot-nav" :class="tfoot==5?'fthis':''" @click="opennew('cuser')">
				<img src="../../../static/index02-active.png" class="factive" />
				<img src="../../../static/index02.png" class="fdefault" />
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
