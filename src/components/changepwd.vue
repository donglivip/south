<template>
  <div class="warpper revise">
  	<div id="head">
			<span @click="back"><img src="../../static/back.png"/></span>
			<div>修改密码</div> 
			<span></span>
		</div>
		<div class="main">
			<div class="title"><img src="../../static/title.png"></div>
			<div class="content">
				<div class="box-group">
					<div class="form-group">
						<i class="icon-user"></i>
						<input type="text" class="form-control" placeholder="请输入手机号码" name="cuserPhone" v-model='cuserPhone'>
					</div>
					<div class="form-group">
						<i class="icon-mima"></i>
						<input type="text" class="form-control" placeholder="请输入身份证号" name="cuserIdentityId" v-model="cuserIdentityId">
					</div>
					<div class="form-group">
						<i class="icon-mima"></i>
						<input type="text" class="form-control" placeholder="请输入密码" name="cuserPassword" v-model="cuserPassword">
					</div>
					<div class="form-group">
						<i class="icon-mima"></i>
						<input type="text" class="form-control" placeholder="请再次输入密码" v-model="pwd">
					</div>
					
				</div>
				
				<div class="denglu" @click="myajax">
					<div class="denglucon">
						<span>立即修改</span>
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
  name: 'changepwd',
  data () {
    return {
      cuserPhone:'',
      cuserIdentityId:'',
      cuserPassword:'',
      pwd:''
    }
  },
  mounted(){
  
  },
  methods:{
  	back:function(){
  		this.$router.back()
  	},
		opennew:function(target){
			this.$router.push({
				name:target
			})
		},
		myajax:function(){
			var that=this
			if(that.cuserPhone==''||that.cuserIdentityId==''||that.cuserPassword==''||that.pwd==''){
				function plusReady(){
					// 显示自动消失的提示消息
					plus.nativeUI.toast( "请把信息填写完整，不能留空");
				}
				if(window.plus){
					plusReady();
				}else{
					document.addEventListener("plusready",plusReady,false);
				}
				return false;
			}
			if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.cuserPhone))) {
					function plusReady(){
						// 显示自动消失的提示消息
						plus.nativeUI.toast( "不是完整的11位手机号或者正确的手机号前七位");
					}
					if(window.plus){
						plusReady();
					}else{
						document.addEventListener("plusready",plusReady,false);
					}
					return false;
			}
			if(that.cuserPassword!=that.pwd){
				function plusReady(){
						// 显示自动消失的提示消息
						plus.nativeUI.toast( "两次密码不一致");
					}
					if(window.plus){
						plusReady();
					}else{
						document.addEventListener("plusready",plusReady,false);
					}
					return false;
			}
			$.ajax({
					type: "post",
					url: that.service + "/updatePasswordByCusers",
					dataType: 'json',
					data: {
						cuserPhone:that.cuserPhone,
						cuserIdentityId:that.cuserIdentityId,
						cuserPassword:that.cuserPassword
					},
					success: function(res) {
						if(res.status != 200) {
							alert(res.msg)
							return false;
						}
						that.opennew('login')
					}
				});
		}
  },
  computed:{
  	service(){
  		return this.$store.state.service
  	}
  }
}
</script>

<style type="text/css" lang="scss">
	html,body,.warpper{padding: 0px;margin: 0px; font-size:.2rem;width: 100%;height: 100%;}
		.revise{background: rgb(30,129,214);}
		.revise .title{height:4rem;display: flex;justify-content: center;align-items: center; }
		.revise .title img{height: .7rem;margin: 0 .6rem;}
		.revise .box-group{display: flex;flex-direction: column;justify-content: center;}
		.revise .denglu{display: flex;justify-content: center;flex-direction: column;align-items: center;}
		.revise .box-group{display: flex;align-items: center;}
		.revise .you,.zhuce{display: flex;color: #FFFFFF;}
		.revise .jiantou{height: .3rem;margin-right:.3rem;}
		.revise .zhuce{align-self: flex-start;margin-left: 1.3rem;}
		.revise .denglucon{margin-bottom:.2rem;width:4.8rem; height: .8rem;background:rgb(254,232,86); border: solid 1px grey;display: flex;justify-content:center;align-items: center;border-radius: .5rem;}
		.revise .footer{width:100%;position: absolute;bottom:0px;height: 1rem;display: flex;justify-content:center;align-items: center;color: #FFFFFF;}
		.revise .form-group{width:5rem;margin: 0 0 .5rem 0;position: relative;display: flex;align-items: center;overflow: hidden;border-radius: .5rem;}
		.revise .form-control{flex:1;border:1px #ccc solid;border-radius: .5rem;box-shadow: none;padding: 0 .45rem 0 .9rem;height: .86rem;}
		.revise .form-group .reg{position: absolute;background: url(../../static/yzkuangn.png) no-repeat;width:1.8rem;height:100%;background-size: cover;font-size: .25rem;display: flex;align-items: center;justify-content: center;text-decoration: none;color: #fff;right:0 ;}
		.revise input{outline:medium;}
		.revise .icon-mima,.icon-user,.icon-yz{position: absolute;width: .42rem;height: .5rem;margin: 0 .3rem;}
		.revise .icon-user{background: url(../../static/phone.png) no-repeat;background-size: cover;}
		.revise .icon-mima{background: url(../../static/mima.png) no-repeat;background-size: cover;}
		.revise .icon-yz{background: url(../../static/yanzhengma.png) no-repeat;background-size: cover;}
		.revise #head{border-bottom: 1px solid white;}
</style>
