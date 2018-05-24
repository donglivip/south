<template>
  <div id="wrapper" class="csearch">
    	<t-head></t-head>
    	<div id="main">
    		<div class="csearch-top">
    			<div class="csearch-inner">
    				<div class="csearch-group" @click="navshow">
    					<span>
    						{{navtext}}
    					</span>
    					<img src="../../../static/xiaxia.png"/>
    				</div>
    				<div class="csearch-group">
    					<input type="text" placeholder="姓名" />
    				</div>
    				<div class="go-search flexc">
    					查询
    				</div>
    			</div>
    		</div>
    		<div class="csearch-main">
    			<div class="group" @click="opennew('cdetail')">
    				<div class="circle"></div>
    				<div class="name">
    					张三
    				</div>
    				<div class="upnum">
    					上报数: 76
    				</div>
    				<div class="oknum">
    					处理数: 45
    				</div>
    				<img src="../../../static/arrright.png"/>
    			</div>
    			<div class="group">
    				<div class="circle"></div>
    				<div class="name">
    					张三
    				</div>
    				<div class="upnum">
    					上报数: 76
    				</div>
    				<div class="oknum">
    					处理数: 45
    				</div>
    				<img src="../../../static/arrright.png"/>
    			</div>
    		</div>
    	</div>
    	<transition name='nav'>
				<bootom-nav v-show='navboo' v-on:navshow='navshow'></bootom-nav>
			</transition>
    	<t-foot></t-foot>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      navboo:false,
      navtext:'人员分类'
    }
  },
  mounted(){
  	this.$store.state.tfoot=2
  },
  methods:{
		opennew:function(target){
			this.$router.push({
				name:target
			})
		},
		navshow:function(id){
			this.navboo=!this.navboo
			this.navtext=id
		}
  },
  computed:{
  	tfoot(){
  		return this.$store.state.tfoot
  	}
  },
  components:{
  	THead:resolve => require(['../tourists/thead'],resolve),
  	TFoot:resolve => require(['./afoot'],resolve),
  	BootomNav: resolve => require(['../bottom-nav'], resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	.csearch{
		background: #EEEEEE;
		.group{
			width: 100%;
			height: .95rem;
			display: flex;
			align-items: center;
			box-shadow: 0 2px 2px 2px gainsboro;
			background: white;
			margin-bottom:.2rem;
			&:nth-of-type(1n) .circle{
				background: #00b7ee;
			}
			&:nth-of-type(2n) .circle{
				background: #e39b00;
			}
			&:nth-of-type(3n) .circle{
				background: #ff5c5c;
			}
			&:nth-of-type(4n) .circle{
				background: #a8f247;
			}
			&:nth-of-type(5n) .circle{
				background: #a264ff;
			}
			&:nth-of-type(6n) .circle{
				background: #00b7ee;
			}
			&:nth-of-type(7n) .circle{
				background: #ff6262;
			}
			&:nth-of-type(8n) .circle{
				background: #b17dff;
			}
			.circle{
				width: .2rem;
				height: .2rem;
				border-radius: 50%;
				background: #00b7ee;
				margin: 0 .22rem 0 .34rem;
			}
			.name{
				width: 2.24rem;
			}
			.upnum{
				width: 2.1rem;
				color: #848484;
			}
			.oknum{
				width: 1.68rem;
				color: #848484;
			}
			img{
				height: .25rem;
			}
		}
		.csearch-top{
			background: white;
			height: 1rem;
			margin-bottom: .17rem;
		}
		.csearch-inner{
			margin: 0 .34rem;
			display: flex;
			align-items: center;
			height: 100%;
			.csearch-group{
				border: 1px solid #1e81d2;
				color: #1e81d2;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 2rem;
				height: .6rem;
				border-radius: .1rem;
				overflow: hidden;
				margin-right:.3rem;
				img{
					height: .15rem;
					margin-left: .25rem;
				}
				input{
					width: 100%;
					height: 100%;
					border: 0;
					text-align: center;
					color: #1e81d2;
				}
				input::-webkit-input-placeholder{
					color: #1e81d2;
				}
			}
			.go-search{
				background: #1e81d2;
				color: white;
				width: 1.8rem;
				height: .6rem;
				border-radius: .1rem;
				margin-left: .2rem;
			}
		}
	}
</style>
