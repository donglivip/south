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
    		<div class="grid" v-for="val in mydata">
    			<div class="text">
    				{{val.cgridName}}
    			</div>
    			<div class="title">
    				{{val.createTime1}}
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
      mydata:''
    }
  },
  mounted(){
  	var that=this
			$.ajax({
				type: "get",
				url: that.service + "/queryCgridByCuserIdNetWork",
				dataType: 'json',
				data: {
					cuserId:localStorage.getItem('userid')
				},
				success: function(res) {
					console.log(res)
					that.mydata=res.data
				}
			});
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
  	service(){
  		return this.$store.state.service
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
			height: .7rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin:.2rem;
			border-bottom: 1px solid #E3E3E3;
		}
	}
</style>
