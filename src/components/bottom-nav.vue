<template>
  <div class="bottom-nav">
    	<div class="nav-group">
    		<div class="sub-nav" v-for="val in navdata" @click="navchange(val)">
    			{{val}}
    		</div>
    		<div class="sub-nav clear" @click="navchange()">
    			取消
    		</div>
    	</div>
  </div>
</template>
<script>
export default {
  name: 'bottomnav',
  data () {
    return {
      
    }
  },
  mounted(){
  
  },
  methods:{
		navchange:function(id){
//			this.$store.state.navid=id
			this.$emit('navshow','id')
		}
  },
  computed:{
  	navdata(){
  		return this.$store.state.navdata
  	}
  }
}
</script>

<style type="text/css" lang="scss">
	.bottom-nav{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.5);
		z-index: 999;
		.nav-group{
			position: absolute;
			bottom: 0;
			left: 0;
			background: white;
			width:100%;
			.sub-nav{
				width: 100%;
				height: .7rem;
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom: 1px solid ghostwhite;
			}
			.clear{
				background: #1e81d2;
				color: white;
				height: .8rem;
			}
		}
	}
</style>
