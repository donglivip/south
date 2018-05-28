<template>
  <div id="wrapper" class="newdetil">
    	<div id="head">
				<span  @click="back">
					<img src="../../static/back.png"/>
				</span>
				<div>美丽南钢</div>
				<span ></span>
			</div>
    	<div id="main">
    		<div class="group">
    			<div class="title">
    				这里是标题
    			</div>
    			<div class="text">
    				这里是内容，这里是内容，这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容，，这里是内容，这里是内容这里是内容，这里是内容
    			</div>
    			<div class="time">
    				2018-05-16
    			</div>
    		</div>
    	</div>
  </div>
</template>

<script>
export default {
  name: 'news',
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
  	THead:resolve => require(['./tourists/thead'],resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	.newdetil{
		background: #ECECEC;
		.group{
			background: white;
			padding: .15rem;
			.title{
				font-size: .3rem;
				font-weight: 600;
				border-bottom:1px solid #ECECEC;
				line-height: .5rem;
			}
			.text{
				color: #666666;
				line-height: .4rem;
				height: .8rem;
				margin-top: .2rem;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.time{
				text-align: right;
				margin-top: .1rem;
				margin-right: .2rem;
			}
		}
	}
</style>
