<template>
  <div id="wrapper" class="cbackdetail">
    	<div id="head">
    		<span @click="back">
    			<img src="../../static/back.png"/>
    		</span> 
    		<div>预处理案卷详情</div> 
    		<span></span>
    	</div>
    	<div id="main">
    		<div class="detail-group">
    			<div class="detail-inner">
    				<img src="../../static/detail=adress.png"/>
    				<div class="detail-text">
    					育林社区1号网格
    				</div>
    			</div>
    		</div>
    		<div class="detail-group">
    			<div class="detail-inner">
    				<img src="../../static/anjuan.png"/>
    				<div class="detail-text">
    					20170209案卷
    				</div>
    			</div>
    			<div class="detail-inner">
    				<img src="../../static/prev.png" class="big-img"/>
    			</div>
    		</div>
    		<div class="detail-group">
    			<div class="detail-inner">
    				<div class="detail-text">
    					是否受理：
    				</div>
    				<div class="detail-arr">
    					<div class="radio" @click="radiochange(0)">
    						<div class="circle-box" :class="radioboo==0?'active':''">
    							<div class="circle"></div>
    						</div>
    						<div class="text">
    							受理
    						</div>
    					</div>
    					<div class="radio" @click="radiochange(1)">
    						<div class="circle-box" :class="radioboo==1?'active':''">
    							<div class="circle"></div>
    						</div>
    						<div class="text">
    							不受理
    						</div>
    					</div>
    				</div>
    			</div>
    			<div class="detail-inner" @click="navshow(id)">
    				<div class="detail-text">
    					不受理原因：
    				</div>
    				<div class="detail-arr">
    					请选择
    				</div>
    				<img src="../../static/arrright.png" class="arrimg"/>
    			</div>
    			<div class="detail-inner" @click="navshow(id)">
    				<div class="detail-text">
    					案卷分类：
    				</div>
    				<div class="detail-arr">
    					请选择
    				</div>
    				<img src="../../static/arrright.png" class="arrimg"/>
    			</div>
    			<div class="detail-inner" @click="navshow(id)">
    				<div class="detail-text">
    					案卷时限：
    				</div>
    				<div class="detail-arr">
    					请选择
    				</div>
    				<img src="../../static/arrright.png" class="arrimg"/>
    			</div>
    		</div>
    		<div class="godubmit">
    			提交
    		</div>
    	</div>
    	<transition name='nav'>
				<bootom-nav v-show='navboo' v-on:navshow='navshow'></bootom-nav>
			</transition>
  </div>
</template>

<script>
export default {
  name: 'ydetail',
  data () {
    return {
      navboo:false,
      radioboo:0
    }
  },
  mounted(){
  	this.$store.state.tfoot=4
  },
  methods:{
  	radiochange:function(id){
  		this.radioboo=id
  	},
		opennew:function(target){
			this.$router.push({
				name:target
			})
		},
		back:function(){
			this.$router.back()
		},
		navshow:function(id){
				this.navboo=!this.navboo
				this.navtext=id
			},
  },
  components:{
  	BootomNav: resolve => require(['./bottom-nav'], resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	.cbackdetail{
		.radio{
			display: flex;
			align-items: center;
			margin-right: .3rem;
			.circle-box{
				width:.36rem;
				height: .36rem;
				border-radius: 50%;
				border: 1px solid #959595;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: .14rem;
				.circle{
					width:.2rem ;
					height: .2rem;
					border-radius: 50%;
					display: none;
					background: #1e81d2;
				}
			}
			.active{
				border-color: #1e81d2;
				.circle{
					display: block;
				}
			}
		}
		.detail-arr{
			display: flex;
		}
		background: #EEEEEE;
		.godubmit{
			background: #1e81d2;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: .1rem;
			margin: .6rem .34rem .3rem;
			height: .9rem;
		}
		.arrimg{
			margin-left: .15rem;
		}
		.detail-group{
			background: white;
			margin-bottom: .22rem;
			border-bottom: 1px solid #d4d3d4;
			.detail-inner{
				margin: 0 .34rem;
				display: flex;
				align-items: center;
				padding: .3rem 0;
				border-bottom: 1px solid #d4d3d4;
				&:last-of-type{
					border: 0;
				}
				img{
					height: .25rem;
					margin-right: .25rem;
				}
				.big-img{
					width: 3.8rem;
					height: 2.6rem;
					display: block;
					margin: .25rem auto;
				}
				.detail-text{
					flex: 1;
				}
			}
		}
	}
</style>
