<template>
	<div id="wrapper" class="userinform">
		<div id="head">
			<span @click="back">
    			<img src="../../static/back.png"/>
    		</span>
			<div>我的资料</div>
			<span></span>
		</div>
		<div id="main">
			<div class="user-group">
				<img :src="cfileDealAfterImg1 | myimg" class="avatar" id="img1" @click="upload('1')"/>
			</div>
			<div class="user-group">
				<div class="inform-group">
					<img src="../../static/inform01.png" />
					<div class="title">
						姓名：
					</div>
					<input type="text" value="董小礼" v-model="name"/>
				</div>
				<div class="inform-group">
					<img src="../../static/inform03.png" />
					<div class="title">
						性别：
					</div>
					<div class="sex-group" @click="tab(1)">
						<div class="circle" :class="sex==1?'active':''"></div>
						<div class="text">男</div>
					</div>
					<div class="sex-group" @click="tab(0)">
						<div class="circle" :class="sex==0?'active':''"></div>
						<div class="text">女</div>
					</div>
				</div>
				<div class="inform-group">
					<img src="../../static/inform02.png" />
					<div class="title">
						身份证：
					</div>
					<input type="text" v-model="personnum"/>
				</div>
				<div class="inform-group">
					<img src="../../static/inform04.png" />
					<div class="title">
						手机号：
					</div>
					<input type="text" v-model="phone" readonly=""/>
				</div>
			</div>
			<div class="inform-group top" @click="myajax">
				{{state}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'userinform',
		data() {
			return {
				state: '修改',
				phone: localStorage.getItem('phone'),
				sex: localStorage.getItem('sex'),
				personnum: localStorage.getItem('usercode'),
				cfileDealAfterImg1: localStorage.getItem('cuserHeadImg'),
				name: localStorage.getItem('username'),
				files:[],
				server:'',
				uploadtarget:'',
			}
		},
		mounted() {
			this.server=this.service+'/uploadYkPersonImage'
		},
		computed: {
			service() {
				return this.$store.state.service;
			}
		},
		methods: {
			tab:function(type){
				this.sex=type
			},
			back: function() {
				this.$router.back()
			},
			myajax: function() {
				var that=this
				$.ajax({
					type: "post",
					url: that.service + "/updateByMyOwnerCusers",
					async: true,
					dataType: 'json',
					data: {
						cuserId: localStorage.getItem('userid'),
						cuserHeadImg: that.cfileDealAfterImg1,
						cuserName:that.name,
						cuserSex:that.sex,
						cuserIdentityId:that.personnum
					},
					success: function(res) {
						console.log(res)
							localStorage.setItem('cuserHeadImg',that.cfileDealAfterImg1)
							localStorage.setItem('sex',that.sex)
							localStorage.setItem('usercode',that.personnum)
							localStorage.setItem('username',that.name)
						if(res.status != 200) {
							alert(res.msg)
							return false;
						} else {
							function plusReady(){
								// 显示自动消失的提示消息
								plus.nativeUI.toast( "修改成功！");
							}
							if(window.plus){
								plusReady();
							}else{
								document.addEventListener("plusready",plusReady,false);
							}

						}
					}
				})
			},
			upload: function(target) {
				var that = this
				that.files = []
				that.uploadtarget = target
				var btnArray = [{
					title: "照相机"
				}, {
					title: "相册"
				}]; //选择按钮  1 2 3
				plus.nativeUI.actionSheet({
					title: "请选择",
					cancel: "取消", // 0
					buttons: btnArray
				}, function(e) {
					var index = e.index; // 
					switch(index) {
						case 1:
							//写自己的逻辑
							that.camera();
							break;
						case 2:
							that.album();
							break;
					}
				});
			},
			camera: function() {
				alert('相机')
				var that = this
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					//成功
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						var img_name = entry.name; //获得图片名称
						var img_path = entry.toLocalURL(); //获得图片路径
						document.getElementById('img' + that.uploadtarget).setAttribute('src', img_path)
						that.upload_img(img_path);
					}, function(e) {
						alert("读取拍照文件错误：" + e.message);
					});

				}, function(e) {
					alert("失败：" + e.message);
				}, {
					filename: '_doc/camera/',
					index: 1
				}); //  “_doc/camera/“  为保存文件名
			},
			album: function() {
				alert('相册')
				var that = this
				plus.gallery.pick(function(path) {
					that.upload_img(path);
					document.getElementById('img' + that.uploadtarget).setAttribute('src', path)
				}, function(e) {
					alert("取消选择图片");
				}, {
					filter: "image"
				});
			},
			upload_img: function(p) {
				var that = this
				var n = p.substr(p.lastIndexOf('/') + 1);
				this.files.push({
					name: "uploadkey",
					path: p
				});
				//开始上传
				that.start_upload();
			},
			start_upload: function() {
				var that = this
				if(this.files.length <= 0) {
					plus.nativeUI.alert("没有添加上传文件！");
					return;
				}
				//原生的转圈等待框
				var wt = plus.nativeUI.showWaiting();
				var task = plus.uploader.createUpload(that.server, {
						method: "POST"
					},
					function(t, status) { //上传完成
						if(status == 200) {
							//资源
							var responseText = t.responseText;
							//转换成json
							var json = eval('(' + responseText + ')');
							//上传文件的信息
							that.files = json.data;
							that.cfileDealAfterImg1 = that.files
							wt.close();
						} else {
							alert("上传失败：" + status);
							//关闭原生的转圈等待框
							wt.close();
						}
					});
				task.addData("uid", that.getUid());
				for(var i = 0; i < that.files.length; i++) {
					var f = that.files[i];
					task.addFile(f.path, {
						key: f.name
					});
				}
				task.start();
			},
			getUid: function() {
				return Math.floor(Math.random() * 100000000 + 10000000).toString();
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	.userinform {
		background: #EEEEEE;
		.top {
			justify-content: center;
			color: #FFFFFF;
			font-size: .3rem!important;
			font-weight: 600;
			height: .8rem!important;
			position: absolute;
			bottom: .2rem;
			background: #1e81d2;
			width: calc(100% - .6rem);
			border-radius: .1rem;
		}
		.avatar {
			display: block;
			width: 1.38rem;
			height: 1.38rem;
			border-radius: 50%;
			margin: .3rem auto;
		}
		.user-group {
			background: white;
			margin-bottom: .3rem;
			overflow: hidden;
		}
		.inform-group {
			margin: 0 .34rem;
			border-bottom: 1px solid #EEEEEE;
			height: 1rem;
			display: flex;
			align-items: center;
			font-size: .25rem;
			.sex-group{
				display: flex;
				align-items: center;
				.circle{
					width: .35rem;
					height: .35rem;
					border-radius: 50%;
					border: 1px solid gainsboro;
					margin-right:.1rem;
					box-sizing: border-box;
				}
				.active{
					border: 0!important;
					background: #1e81d2;
				}
			}
			.sex-group:last-of-type .circle{
					margin-left: .1rem;
				}
			.title {
				width: 1.6rem;
				font-weight: 600;
			}
			img {
				height: .35rem;
				margin-right: .25rem;
			}
			input {
				border: 0;
				flex: 1;
			}
		}
	}
</style>