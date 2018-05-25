<template>
	<div class="wrapper login">
		<div class="main">
			<div class="title"><img src="../../static/title.png"></div>
			<div class="content">
				<div class="box-group">
					<div class="form-group">
						<i class="icon-user"></i>
						<input type="text" class="form-control" placeholder="请输入手机号码">
					</div>
					<div class="form-group">
						<i class="icon-mima"></i>
						<input type="password" class="form-control" placeholder="请输入密码">
					</div>

				</div>

				<div class="denglu">
					<div class="denglucon">
						<span>立即登录</span>
					</div>

					<div class="zhuce" @click="opennew('register')">
						<span>已经有账号，去注册</span>
						<img class="jiantou" src="../../static/jiantou2.png">
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
		name: 'login',
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			}
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			}
		}
	}
</script>

<style type="text/css" lang="scss">
		html,body,.warpper{padding: 0px;margin: 0px; font-size:.2rem;width: 100%;height: 100%;}
		.login{background: rgb(30,129,214);}
		.login .title{height:4rem;display: flex;justify-content: center;align-items: center; }
		.login .title img{height: .7rem;margin: 0 .6rem;}
		.login .box-group{display: flex;flex-direction: column;justify-content: center;}
		.login .denglu{display: flex;justify-content: center;flex-direction: column;align-items: center;}
		.login .box-group{display: flex;align-items: center;}
		.login .you,.zhuce{display: flex;color: #FFFFFF;}
		.login .jiantou{height: .3rem;transform: rotate(180deg);margin-left: .3rem;}
		.login .zhuce{align-self: flex-end;margin-right:1.3rem;}
		.login .you,.zhuce{display: flex;justify-content: flex-end;color: #FFFFFF;margin-top:.2rem;}
		.login .denglucon{margin-bottom:.2rem;width:5rem; height: .8rem;background:rgb(255,103,105);color: #fff; border: solid 1px grey;display: flex;justify-content:center;align-items: center;border-radius: .4rem;}
		.login .footer{width:100%;position: absolute;bottom:0px;height: 1rem;display: flex;justify-content:center;align-items: center;color: #FFFFFF;}
		.login .form-group{margin: 0 0 .5rem 0;position: relative;display: flex;align-items: center;width: 5rem;}
		.login .form-control{flex:1;border:1px #ccc solid;border-radius: .5rem;box-shadow: none;padding: 0 .45rem 0 .9rem;height: .86rem;}
		.login .form-group .reg{position: absolute;background: url(../../static/yzkuangn.png);width:1.8rem;height: .8rem;background-size: cover;font-size: .25rem;display: flex;align-items: center;justify-content: center;text-decoration: none;color: #fff;transition: all 0.5s ease 0s;margin-left:3.1rem ;}
		.login input{outline:medium;}
		.login .icon-mima,.icon-user{position: absolute;width: .42rem;height: .5rem;margin: 0 .3rem;}
		.login .icon-user{background: url(../../static/phone.png) no-repeat;background-size: cover;}
		.login .icon-mima{background: url(../../static/mima.png) no-repeat;background-size: cover;}
		
</style>