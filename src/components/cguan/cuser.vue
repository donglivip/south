<template>
  <div id="wrapper" class="user">
    	<t-head></t-head>
    	<div id="main">
    		<img src="../../../build/logo.png" class="avatar"/>
    		<div class="name">
    			张三-环卫
    		</div>
    		<div class="menu">
    			<div class="submenu" @click="opennew('changepwd')">
    				<img src="../../../static/user-pwd.png"/>
    				<span>
    					修改密码
    				</span>
    				<img src="../../../static/arrright.png"/>
    			</div>
    			<div class="submenu" @click="opennew('changepwd')">
    				<img src="../../../static/user-user.png"/>
    				<span>
    					修改个人信息
    				</span>
    				<img src="../../../static/arrright.png"/>
    			</div>
    			<div class="submenu" @click="opennew('changepwd')">
    				<img src="../../../static/user-record.png"/>
    				<span>
    					处理记录
    				</span>
    				<img src="../../../static/arrright.png"/>
    			</div>
    			<div class="submenu" @click="opennew('changepwd')">
    				<img src="../../../static/user-tong.png"/>
    				<span>
    					案卷统计
    				</span>
    				<img src="../../../static/arrright.png"/>
    			</div>
    			<div class="submenu" @click="opennew('changepwd')">
    				<img src="../../../static/user-ren.png"/>
    				<span>
    					人员统计
    				</span>
    				<img src="../../../static/arrright.png"/>
    			</div>
    			<div class="submenu" @click="opennew('changepwd')">
    				<img src="../../../static/user-wang.png"/>
    				<span>
    					网格管理
    				</span>
    				<img src="../../../static/arrright.png"/>
    			</div>
    			<div class="clear">
    				退出登录
    			</div>
    		</div>
    	</div>
    	<t-foot></t-foot>
  </div>
</template>

<script>
export default {
  name: 'tuser',
  data () {
    return {
      
    }
  },
  components:{
  	
  },
  mounted(){
  	this.$store.state.tfoot=5
  },
  methods:{
		opennew:function(target) {
				this.$router.push({
					name: target
				})
			}
  },
  computed:{
  	tfoot(){
  		return this.$store.state.tfoot
  	}
  },
  components:{
  	THead:resolve => require(['../tourists/thead'],resolve),
  	TFoot:resolve => require(['./cfoot'],resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	.user{
		.avatar{
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			display: block;
			margin: 1rem auto 0;
		}
		.name{
			font-size: .33rem;
			text-align: center;
			margin-top:.4rem ;
			text-align: center;
			font-weight: 500;
		}
		.menu{
			margin: .9rem 0 0 0;
			.submenu{
				margin: 0 .5rem;
				display: flex;
				align-items: center;
				border-bottom:1px solid #d8d8d8;
				height: .8rem;
				img{
					height: .3rem;
				}
				span{
					flex: 1;
					margin-left: .18rem;
				}
			}
		}
		.clear{
			background: #ff5757;
			color: white;
			height: .8rem;
			width: 6.3rem;
			border-radius: .1rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: .5rem auto 0;
		}
	}
</style>
