<template>
  <div class="bottom-nav">
    	<div class="nav-group">
    		<div class="sub-nav" v-for="(val,index) in navdata">
    				<span v-show="navindex==-1" @click="navchange(val.name,index)">{{val.name}}</span>
    				<transition name='tran2'>
    					<div v-show="navindex==index?true:false">
			    			<div class="sub-nav nav-inner" v-for="list in val.date" @click.stop="navchange(list)">
				    			{{list}}
				    		</div>
			    		</div>
		    		</transition>
    		</div>
    		<div class="sub-nav clear" @click="navchange('分类')">
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
      navindex:-1
    }
  },
  mounted(){
  
  },
  methods:{
		navchange:function(id,index){
			this.navindex=index
			if(index==undefined){
				this.$emit('navshow',id)
				this.navindex=-1
			}
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
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom: 1px solid ghostwhite;
				flex-direction: column;
			}
			span{
				padding: .3rem 0;
			}
			.nav-inner{
				padding: .3rem 0;
			}
			.clear{
				background: #1e81d2;
				color: white;
				height: .8rem;
			}
		}
	}
</style>
