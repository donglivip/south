<template>
  <div class="warpper register">
		<div class="main">
			<div class="title"><img src="../../static/title.png"></div>
			<div class="content">
				<div class="box-group">
					<div class="form-group">
						<i class="icon-user"></i>
						<input type="text" class="form-control" placeholder="请输入手机号码">
					</div>
					<div class="form-group yza">
						<i class="icon-yz"></i>
						<input type="text" class="form-control" placeholder="请输入验证码">
						<a href="#" class="reg">发送验证码</a>
					</div>
					<div class="form-group">
						<i class="icon-mima"></i>
						<input type="text" class="form-control" placeholder="请设置密码">
					</div>
					<div class="form-group">
						<i class="icon-mima"></i>
						<input type="text" class="form-control" placeholder="请设置密码">
					</div>
					
				</div>
				
				<div class="denglu">
					<div class="denglucon">
						<span>立即注册</span>
					</div>
					
					<div class="zhuce" @click="opennew('login')">
						<img class="jiantou" src="../../static/jiantou2.png"> 
						<span>已经有账号，去登陆</span>
					</div>
				</div>
			</div>
			<div class="footer">
				<span>版权所有：南昌市青山湖区南钢街道办事处</span>
			</div>
		</div>
		</div>
</template>

<script>
export default {
  name: 'index',
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
		}
  },
  computed:{
  	tfoot(){
  		return this.$store.state.tfoot
  	}
  }
}
</script>

<style type="text/css" lang="scss">
	html,body,.warpper{padding: 0px;margin: 0px; font-size:.2rem;width: 100%;height: 100%;}
		.register{background: rgb(30,129,214);}
		.register .title{height:4rem;display: flex;justify-content: center;align-items: center; }
		.register .title img{height: .7rem;margin: 0 .6rem;}
		.register .box-group{display: flex;flex-direction: column;justify-content: center;}
		.register .denglu{display: flex;justify-content: center;flex-direction: column;align-items: center;}
		.register .box-group{display: flex;align-items: center;}
		.register .you,.zhuce{display: flex;color: #FFFFFF;}
		.register .jiantou{height: .3rem;margin-right:.3rem;}
		.register .zhuce{align-self: flex-start;margin-left: 1.3rem;}
		.register .denglucon{margin-bottom:.2rem;width:4.8rem; height: .8rem;background:rgb(254,232,86); border: solid 1px grey;display: flex;justify-content:center;align-items: center;border-radius: .5rem;}
		.register .footer{width:100%;position: absolute;bottom:0px;height: 1rem;display: flex;justify-content:center;align-items: center;color: #FFFFFF;}
		.register .form-group{width:5rem;margin: 0 0 .5rem 0;position: relative;display: flex;align-items: center;overflow: hidden;border-radius: .5rem;}
		.register .form-control{flex:1;border:1px #ccc solid;border-radius: .5rem;box-shadow: none;padding: 0 .45rem 0 .9rem;height: .86rem;}
		.register .form-group .reg{position: absolute;background: url(../../static/yzkuangn.png);width:1.8rem;height: 100%;background-size: cover;font-size: .25rem;display: flex;align-items: center;justify-content: center;text-decoration: none;color: #fff;right:0;}
		.register input{outline:medium;}
		.register .icon-mima,.icon-user,.icon-yz{position: absolute;width: .42rem;height: .5rem;margin: 0 .3rem;}
		.register .icon-user{background: url(../../static/phone.png) no-repeat;background-size: cover;}
		.register .icon-mima{background: url(../../static/mima.png) no-repeat;background-size: cover;}
		.register .icon-yz{background: url(../../static/yanzhengma.png) no-repeat;background-size: cover;}
		
</style>
