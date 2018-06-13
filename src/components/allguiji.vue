<template>
  <div id="wrapper" class="csearch">
    	<div id="head">
				<span @click="back">
					<img src="../../static/back.png"/>
				</span>
				<div>美丽南钢</div>
				<span></span>
			</div>
    	<div id="main">
    		<div class="csearch-top">
    			<div class="csearch-inner">
    				<div class="csearch-group" @click="navshow">
    					<span>
    						{{navtext}}
    					</span>
    					<img src="../../static/xiaxia.png"/>
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
    			 <!--@click="opennew('cdetail','cworkId')"-->
    			<div class="group" v-for="val in mydata">
    				<div class="circle"></div>
    				<div class="name">
    					{{val.cworkTitle}}
    				</div>
    				<div class="upnum">
    					{{val.createTime1}}
    				</div>
    				<img src="../../static/arrright.png"/>
    			</div>
    			<p v-if="mydata.length==0">
    				暂无轨迹
    			</p>
    		</div>
    	</div>
    	<transition name='nav'>
				<bootom-nav v-show='navboo' v-on:navshow='navshow'></bootom-nav>
			</transition>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      navboo:false,
      navtext:'人员分类',
      mydata:[]
    }
  },
  mounted(){
  	this.$store.state.tfoot=2
  	this.myajax()
  	function plusReady(){
				// 弹出系统等待对话框
				var w = plus.nativeUI.showWaiting( "加载中..." );
			}
			if(window.plus){
				plusReady();
			}else{
				document.addEventListener("plusready",plusReady,false);
			}
  },
  methods:{
  	myajax:function(){
				var that=this
				$.ajax({
					type: "get",
					url: that.service + "/querAllCwork",
					dataType: 'json',
					data: {
						cuserId:localStorage.getItem('userid')
					},
					success: function(res) {
						function plusReady() {
											// 显示自动消失的提示消息
											plus.nativeUI.closeWaiting();
											that.myajax()
										}
										if(window.plus) {
											plusReady();
										} else {
											document.addEventListener("plusready", plusReady, false);
										}
						that.mydata=res.data
					}
				});
			},
		opennew:function(target,id){
			this.$store.state.searchid=id
			this.$router.push({
				name:target
			})
		},
		navshow:function(id){
			this.navboo=!this.navboo
			this.navtext=id
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
  	THead:resolve => require(['./tourists/thead'],resolve),
  	BootomNav: resolve => require(['./bottom-nav'], resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	.csearch{
		background: #EEEEEE;
		p{
			text-align: center;
			line-height: 1rem;
		}
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
				flex: 1;
			}
			.upnum{
				width: 2.5rem;
				color: #848484;
				white-space: nowrap;
			}
			.oknum{
				width: 1.68rem;
				color: #848484;
			}
			img{
				height: .25rem;
				margin-right: .2rem;
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
