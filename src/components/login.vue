<template>
	<div class="wrapper login">
		<div id="head">
			<span @click="back">
    			<img src="../../static/back.png"/>
    		</span>
			<div>登录</div>
			<span></span>
		</div>
		<div class="main">
			<div class="title"><img src="../../static/title.png"></div>
			<div class="content">
				<div class="box-group">
					<div class="form-group	">
						<i class="icon-user"></i>
						<input type="text" class="form-control" placeholder="请输入手机号码" v-model="phone" @focus="myfocus" @blur="myfocus">
					</div>
					<div class="form-group">
						<i class="icon-mima"></i>
						<input type="password" class="form-control" placeholder="请输入密码" v-model="pwd" @focus="myfocus" @blur="myfocus">
					</div>
				</div>
				<div class="denglu">
					<div class="denglucon" @click="submit">
						<span>立即登录</span>
					</div>
				</div>
			</div>
			<div class="footer" v-if="fot">
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
				phone: '',
				pwd: '',
				fot: true
			}
		},
		mounted() {

		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			submit: function() {
				plus.nativeUI.showWaiting('登录中...')
				if(this.phone == '' || this.pwd == '') {
					alert('账号或密码不能为空！')
					return
				}
				//				if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.phone))){ 
				//				  alert("不是完整的11位手机号或者正确的手机号前七位"); 
				//				  return false; 
				//				 } 
				var that = this
				$.ajax({
					type: "get",
					url: that.service + "/queryLoginByCuserPhone",
					async: true,
					dataType: 'json',
					data: {
						cuserPhone: that.phone,
						cuserPassword: that.pwd
					},
					success: function(res) {
						plus.nativeUI.closeWaiting()
						if(res.status != 200) {
							plus.nativeUI.toast(res.msg)
							return false;
						} else {
							localStorage.setItem('userid', res.data.cuserId)
							localStorage.setItem('cuserRole', res.data.cuserRole)
							localStorage.setItem('cuserHeadImg', res.data.cuserHeadImg)
							localStorage.setItem('phone', res.data.cuserPhone)
							localStorage.setItem('sex', res.data.cuserSex)
							localStorage.setItem('usercode', res.data.cuserIdentityId)
							localStorage.setItem('username', res.data.cuserName)
							if(res.data.cuserRole == 0 || res.data.cuserRole == 1 || res.data.cuserRole == 2 || res.data.cuserRole == 3) {
								that.opennew('tindex')
							} else if(res.data.cuserRole == 4) {
								that.opennew('windex')
							} else if(res.data.cuserRole == 5) {
								that.opennew('hindex')
							} else if(res.data.cuserRole == 6 || res.data.cuserRole == 7) {
								that.opennew('cindex')
							} else {
								that.opennew('asearch')
							}
						}

					}
				});
			},
			back: function() {
				this.$router.back()
			},
			myfocus: function() {
				this.fot = !this.fot
			}
		},
		computed: {
			service() {
				return this.$store.state.service
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	html,
	body,
	.warpper {
		padding: 0px;
		margin: 0px;
		font-size: .2rem;
		width: 100%;
		height: 100%;
	}
	
	.login {
		background: rgb(30, 129, 214);
		i{
			position: inherit!important;
		}
	}
	
	.login .title {
		height: 4rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.login .title img {
		height: .7rem;
		margin: 0 .6rem;
	}
	
	.login .box-group {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.login .denglu {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	
	.login .box-group {
		display: flex;
		align-items: center;
	}
	
	.login .you,
	.zhuce {
		display: flex;
		color: #FFFFFF;
	}
	
	.login .jiantou {
		height: .3rem;
		transform: rotate(180deg);
		margin-left: .3rem;
	}
	
	.login .zhuce {
		align-self: flex-end;
		margin-right: 1.3rem;
	}
	
	.login .you,
	.zhuce {
		display: flex;
		justify-content: flex-end;
		color: #FFFFFF;
		margin-top: .2rem;
	}
	
	.login .denglucon {
		margin-bottom: .2rem;
		width: 5rem;
		height: .8rem;
		background: rgb(255, 103, 105);
		color: #fff;
		border: solid 1px grey;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: .4rem;
	}
	
	.login .footer {
		width: 100%;
		position: absolute;
		bottom: 0px;
		height: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}
	
	.login .form-group {
		margin: 0 0 .5rem 0;
		display: flex;
		align-items: center;
		width: 5rem;
		border: 1px #ccc solid;
		border-radius: .5rem;
		background: white;
		overflow: hidden;
	}
	
	.login .form-control {
		flex: 1;
		box-shadow: none;
		height: .86rem;
		border: 0;
	}
	
	.login .form-group .reg {
		position: absolute;
		background: url(../../static/yzkuangn.png);
		width: 1.8rem;
		height: .8rem;
		background-size: cover;
		font-size: .25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: #fff;
		transition: all 0.5s ease 0s;
		margin-left: 3.1rem;
	}
	
	.login input {
		outline: medium;
	}
	
	.login .icon-mima,
	.icon-user {
		position: absolute;
		width: .42rem;
		height: .5rem;
		margin: 0 .3rem;
	}
	
	.login .icon-user {
		background: url(../../static/phone.png) no-repeat;
		background-size: cover;
	}
	
	.login .icon-mima {
		background: url(../../static/mima.png) no-repeat;
		background-size: cover;
	}
</style>