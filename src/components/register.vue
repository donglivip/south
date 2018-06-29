<template>
	<div class="warpper register">
		<div id="head">
			<span @click="back">
    			<img src="../../static/back.png"/>
    		</span>
			<div>注册</div>
			<span></span>
		</div>
		<div class="main">
			<div class="content">
				<form @submit.prevent="submit($event)" name="yForm">
					<div class="box-group">
						<div class="form-group">
							<!--<i class="icon-user"></i>-->
							<input type="text" class="form-control" placeholder="请输入姓名" v-model="inputdata.cuserName" name="cuserName" @focus="myfocus" @blur="myfocus">
						</div>
						<div class="form-group">
							<!--<i class="icon-user"></i>-->
							<input type="text" class="form-control" placeholder="请输入身份证号" v-model="inputdata.cuserIdentityId" name="cuserIdentityId" @focus="myfocus" @blur="myfocus">
						</div>
						<div class="form-group">
							<!--<i class="icon-mima"></i>-->
							<p class="img">{{fileimg}}</p>
							<input type="file" class="form-control" placeholder="" name="picPath" @change="upload" id="file" accept="image/*">
							<img :src="inputdata.picPath" id="preview"/>
						</div>
						<div class="form-group">
							<!--<i class="icon-user"></i>-->
							<input type="text" class="form-control" placeholder="请输入现住址" v-model="inputdata.cuserAddress" name="cuserAddress" @focus="myfocus" @blur="myfocus">
						</div>
						<div class="form-group">
							<!--<i class="icon-user"></i>-->
							<input type="text" class="form-control" placeholder="请输入手机号码" v-model="inputdata.cuserPhone" name="cuserPhone" @focus="myfocus" @blur="myfocus">
						</div>
						<div class="form-group">
							<!--<i class="icon-mima"></i>-->
							<input type="password" class="form-control" placeholder="请设置密码" v-model="inputdata.cuserPassword" name="cuserPassword" @focus="myfocus" @blur="myfocus">
						</div>
						<div class="form-group">
							<!--<i class="icon-mima"></i>-->
							<input type="password" class="form-control" placeholder="请再次设置密码" v-model="pwd02" @focus="myfocus" @blur="myfocus">
						</div>
						<div class="form-group" style="display: none;">
							<!--<i class="icon-mima"></i>-->
							<input type="number" class="form-control" value="0" name="cuserRole" @focus="myfocus" @blur="myfocus">
						</div>
						<div class="form-group">
							<!--<i class="icon-mima"></i>-->
							<label for="">
								<input type="radio" name="cuserSex" value="0" checked=""/>女
							</label>
							<label for="">
								<input type="radio" name="cuserSex" value="1" />男
							</label>
						</div>
						<div class="form-group" style="display: none;">
							<!--<i class="icon-mima"></i>-->
							<input type="text" class="form-control" v-model="inputdata.cuserCode" name="cuserCode">
						</div>
					</div>
					<div class="denglu">
						<input type="submit" value="立即注册" class="denglucon" />
						<div class="zhuce" @click="opennew('login')">
							<img class="jiantou" src="../../static/jiantou2.png">
							<span>已经有账号，去登陆</span>
						</div>
					</div>
				</form>
			</div>
			<div class="footer" v-if="fot">
				<span>版权所有：南昌市青山湖区南钢街道办事处</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'register',
		data() {
			return {
				inputdata: {
					cuserPhone: '',
					cuserPassword: '',
					cuserCode: '',
					cuserRole: 0,
					cuserName: '',
					cuserIdentityId: '',
					cuserAddress: '',
					picPath: require('../../static/creame.png'),
				},
				pwd02: '',
				fileimg:'请选择您的头像',
				fot:true
			}
		},
		mounted() {
			var that = this
			function plusReady() {
				that.inputdata.cuserCode = plus.device.uuid
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener("plusready", plusReady, false);
			}
		},
		methods: {
			upload:function(){
				var pic = document.getElementById('preview');
				var file = document.getElementById('file');

				if(window.FileReader) { //chrome,firefox7+,opera,IE10,IE9，IE9也可以用滤镜来实现
					var oFReader = new FileReader();
					oFReader.readAsDataURL(file.files[0]);
					oFReader.onload = function(oFREvent) {
						pic.src = oFREvent.target.result;
					};

				} else if(document.all) { //IE8-
					file.select();
					var reallocalpath = document.selection.createRange().text //IE下获取实际的本地文件路径
					if(window.ie6) pic.src = reallocalpath; //IE6浏览器设置img的src为本地路径可以直接显示图片
					else { //非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现，IE10浏览器不支持滤镜，需要用FileReader来实现，所以注意判断FileReader先
						pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
						pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; //设置img的src为base64编码的透明图片，要不会显示红xx
					}
				} else if(file.files) { //firefox6-
					if(file.files.item(0)) {
						url = file.files.item(0).getAsDataURL();
						pic.src = url;
					}
				}
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			submit: function(event) {
				plus.nativeUI.showWaiting('提交中...')
				var formData = new FormData(event.target);
				var that = this
				var file = document.getElementById('file');
				var fileData = file.files[0];
				var size = fileData.size;
				if(this.inputdata.cuserPassword.length>=6) {
					alert('密码必须为6位数以上!')
					return false;
				}
				if(parseInt(size)>=1048576){
					alert('上传图片过大，请更换图片后重试！')
					return false;
				}
				if(this.inputdata.cuserPassword == '') {
					alert('密码不能为空!')
					return false;
				}
				if(this.inputdata.cuserName == '') {
					alert('姓名不能为空!')
					return false;
				}
				if(this.inputdata.cuserIdentityId == '') {
					alert('身份证号不能为空!')
					return false;
				}
				if(this.inputdata.cuserAddress == '') {
					alert('现住址不能为空!')
					return false;
				}
				if(this.inputdata.picPath == '') {
					alert('用户头像不能为空!')
					return false;
				}
				if(this.inputdata.cuserPhone == '') {
					alert('手机号不能为空!')
					return false;
				}
				if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.inputdata.cuserPhone))) {
					alert("不是完整的11位手机号或者正确的手机号前七位");
					return false;
				}
				if(this.inputdata.cuserPassword != this.pwd02) {
					alert('两次密码不一致!')
					return false;
				}
				$.ajax({
					type: "post",
					url: that.service + "/register",
					dataType: 'json',
					contentType: false,
					processData: false,
					data: formData,
					success: function(res) {
						plus.nativeUI.closeWaiting()
						if(res.status != 200) {
							alert(res.msg)
							return
						}
						that.opennew('login')
					}
				});
			},
			back: function() {
				this.$router.back()
			},
			myfocus:function() {
				this.fot=!this.fot
			}
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			},
			service() {
				return this.$store.state.service
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	input[type=radio] {
		display: inline-block;
		vertical-align: middle;
		width: .4rem;
		height: .4rem;
		-webkit-appearance: none;
		background-color: transparent;
		border: 0;
		outline: 0 !important;
		line-height: 20px;
		color: #d8d8d8;
		margin: .2rem;
	}
	input[type=file]{
		opacity: 0;
	}
	input[type=radio]:after {
		content: "";
		display: block;
		width: .4rem;
		height: .4rem;
		border-radius: 50%;
		text-align: center;
		line-height: .4rem;
		color: #fff;
		border: 1px solid #ddd;
		background-color: #fff;
		box-sizing: border-box;
	}
	
	input[type=radio]:checked:after {
		border-color: #1e81d6;
		background-color: #1e81d6;
	}
	
	html,
	body,
	.warpper {
		padding: 0px;
		margin: 0px;
		font-size: .2rem;
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.register {
		background: rgb(30, 129, 214);
		overflow-y: scroll;
		.img{
			width:5rem ;
			position: absolute;
			display: block;
			text-indent: .2rem;
			color: #666666;
		}
	}
	
	.register .title {
		height: 4rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.register .title img {
		height: .7rem;
		margin: 0 .6rem;
	}
	
	.register .box-group {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.register .denglu {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	
	.register .box-group {
		display: flex;
		align-items: center;
		margin-top: 1rem;
	}
	
	.register .you,
	.zhuce {
		display: flex;
		color: #FFFFFF;
	}
	
	.register .jiantou {
		height: .3rem;
		margin-right: .3rem;
	}
	
	.register .zhuce {
		align-self: flex-start;
		margin-left: 1.3rem;
	}
	
	.register .denglucon {
		margin-bottom: .2rem;
		width: 4.8rem;
		height: .8rem;
		background: rgb(254, 232, 86);
		border: solid 1px grey;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: .5rem;
	}
	
	.register .footer {
		width: 100%;
		position: absolute;
		bottom: 0px;
		height: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		background: #1e81d6;
	}
	
	.register .form-group {
		width: 5rem;
		margin: 0 0 .5rem 0;
		position: relative;
		display: flex;
		align-items: center;
		overflow: hidden;
		border-radius: .5rem;
		border: 1px #ccc solid;
		border-radius: .5rem;
		box-shadow: none;
		overflow: hidden;
		background: white;
	}
	
	.register .form-group img {
		height: .6rem;
		margin-right: .3rem;
		position: absolute;
		right: .1rem;
		top: .1rem;
	}
	
	.register .form-control {
		flex: 1;
		border: 0;
		padding: 0 .45rem 0 .2rem;
		height: .86rem;
	}
	
	.register .form-group .reg {
		position: absolute;
		background: url(../../static/yzkuangn.png);
		width: 1.8rem;
		height: 100%;
		background-size: cover;
		font-size: .25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: #fff;
		right: 0;
	}
	
	.register input {
		outline: medium;
	}
	
	.register .icon-mima,
	.icon-user,
	.icon-yz {
		position: absolute;
		width: .42rem;
		height: .5rem;
		margin: 0 .3rem;
	}
	
	.register .icon-user {
		background: url(../../static/phone.png) no-repeat;
		background-size: cover;
	}
	
	.register .icon-mima {
		background: url(../../static/mima.png) no-repeat;
		background-size: cover;
	}
	
	.register .icon-yz {
		background: url(../../static/yanzhengma.png) no-repeat;
		background-size: cover;
	}
	
	.register .content {
		height: 100%;
		overflow-y: scroll;
	}
</style>