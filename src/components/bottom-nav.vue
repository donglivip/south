<template>
  <div class="bottom-nav">
    	<div class="nav-group">
    		<div class="sub-nav" v-for="(val,index) in bottomone" v-show="navindex==0">
    				<span @click="havetwo(val.id,val.name)">{{val.name}}</span>
    		</div>
    		<div class="sub-nav" v-for="(val) in bottomtwo" v-show="navindex==1">
    				<span @click="navchange(val.name,val.id)">{{val.name}}</span>
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
      navindex:0,
      bottomtwo:[]
    }
  },
  mounted(){
  	
  },
  methods:{
		navchange:function(name,id){
			this.$emit('navshow',name)
			this.$store.state.bottomtwoid=id
			this.navindex=0
		},
		havetwo:function(id,name){
			var that=this
			var mynav=[]
			this.$store.state.ctypeTitle=name
			$.ajax({
				type: "get",
				url: that.service + "/queryCtypeTwo",
				async: true,
				dataType: 'json',
				data:{
					ctypeId:id
				},
				success: function(res) {
					for (var i=0;i<res.data.length;i++) {
						var myjson={name:''+res.data[i].ctypeTwoTitle+'',id:''+res.data[i].ctypeTwoId+''}
						mynav.push(myjson)
					}
					that.bottomtwo=mynav
					that.navindex=1
				}
			});
		}
  },
  computed:{
  	bottomone(){
  		return this.$store.state.bottomone
  	},
  	service(){
  		return this.$store.state.service
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
