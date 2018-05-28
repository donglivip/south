<template>
  <div id="wrapper" class="news">
    	<div id="head">
				<span  @click="back">
					<img src="../../static/back.png"/>
				</span>
				<div>美丽南钢</div>
				<span ></span>
			</div>
    	<div id="main">
    		<div class="group" @click="opennew('newdetail')">
    			<div class="circle"></div>
    			<div class="title">
    				恭喜您获得老东家黄焖鸡赠送的代金卷一张
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
	.news{
		background: #ECECEC;
		.group{
			background: white;
			padding: .15rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title{
				font-size: .3rem;
				font-weight: 600;
				line-height: .5rem;
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
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
				width: 1.5rem;
			}
			.circle{
				width: .1rem;
				height: .1rem;
				border-radius: 50%;
				background: rgb(280,80,60);
				margin-right: .15rem;
			}
		}
	}
</style>
