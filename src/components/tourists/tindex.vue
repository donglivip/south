<template>
	<div id="wrapper" class="tindex">
		<t-head></t-head>
		<div id="main">
			<div class="tindex-top">、
					<div class="img-box" @click="upload('1')">
						<img src="../../../static/creame.png" class="gocream" v-show="!upimg"/>
						<img :src="upsrc"  id="img1" v-show="upimg"/>
					</div>
					<div class="tindex-setting">
						<div class="setting-group" @click="clear">
							<img src="../../../static/reset.png" />
							<span>
	    						 取消
	    					</span>
						</div>
						<div class="setting-group" @click="navshow('分类')">
							{{navtext}}
						</div>
						<div class="setting-group" @click="submit">
							<img src="../../../static/upload.png" />
							<span>
	    						 上传
	    					</span>
						</div>
					</div>、
			</div>
			<div class="tindex-bottom">
				<div class="bottom-title">
					<img src="../../../static/prompt.png" />
					<span>
    					温馨提示
    				</span>
				</div>
				<div class="bottom-group">
					<span>
    					1、
    				</span>
					<span>
    					您可以游客身份，点击摄像按钮对发现问题进行拍摄；
    				</span>
				</div>
				<div class="bottom-group">
					<span>
    					2、
    				</span>
					<span>
    					请打开手机定位功能，以方便问题案卷派送给所属网格员处理；
    				</span>
				</div>
				<div class="bottom-group">
					<span>
    					3、
    				</span>
					<span>
    					您注册并登陆，我们会将整改后案卷反馈给您；
    				</span>
				</div>
				<div class="bottom-group">
					<span>
    					4、
    				</span>
					<span>
    					美好家园共同维护，我们鼓励您协助整改，登录后可将整改后照片上传，我们将对您的文明行为进行记录。
    				</span>
				</div>
			</div>
		</div>
		<t-foot></t-foot>
		<transition name='bottom'>
			<bottom-nav v-show='bottomboo' @navshow='navshow'></bottom-nav>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'tindex',
		data() {
			return {
				creamsrc: '',
				uploadtarget: '',
				server: '',
				files: [],
				upimg: false,
				upsrc: '',
				navtext: '选择分类',
				bottomboo: false,
				cfileStation: '',
				w: ''
			}
		},
		components: {
			THead: resolve => require(['./thead'], resolve),
			TFoot: resolve => require(['./tfoot'], resolve),
			bottomNav:resolve => require(['../bottom-nav'], resolve)
		},
		mounted() {
			this.$store.state.tfoot = 1
			this.server=this.service+'/uploadYhImage'
			var that=this
		},
		methods: {
			submit: function(event) {
				if(this.navtext == '选择分类') {
					function plusReady() {
						// 显示自动消失的提示消息
						plus.nativeUI.toast("请选择分类!");
						return false;
					}
					if(window.plus) {
						plusReady();
					} else {
						document.addEventListener("plusready", plusReady, false);
					}
				}
				if(this.upsrc == '') {
					function plusReady() {
						// 显示自动消失的提示消息
						plus.nativeUI.toast("请上传图片!");
						return false;
					}
					if(window.plus) {
						plusReady();
					} else {
						document.addEventListener("plusready", plusReady, false);
					}
				}
				var that = this
				function plusReady() {
					// 弹出系统等待对话框
					that.w = plus.nativeUI.showWaiting("上传中...");
					plus.geolocation.getCurrentPosition(function(p) {
						console.log(localStorage.getItem('userid'))
						console.log(that.files)
						console.log(p.coords.longitude + ',' + p.coords.latitude)
						console.log(that.bottomtwoid)
						$.ajax({
							type: "post",
							url: that.service + "/insertCfileAndCuserAreadyRegister",
							dataType: 'json',
							data: {
								cuserId:localStorage.getItem('userid'),
								cfileDealPrevImg1:that.files,
								cfileStation:p.coords.longitude + ',' + p.coords.latitude,
								ctypeTwoId:that.bottomtwoid
							},
							success: function(res) {
								console.log(res)
								if(res.status != 200) {
									alert(res.msg)
								} else {
									function plusReady() {
										that.w.close()
										plus.nativeUI.closeWaiting();
										plus.nativeUI.toast("上传完成");
										that.upimg = false
										that.navtext = '选择分类'
									}
									if(window.plus) {
										plusReady();
									} else {
										document.addEventListener("plusready", plusReady, false);
									}
								}
							},error:function(err){
								console.log(JSON.stringify(err))
							}
						});
					}, function(e) {
						alert('Geolocation error: ' + e.message);
					});
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}

			},
			navshow:function(name){
				this.navtext=name
				this.bottomboo=!this.bottomboo
			},
			clear:function(){
				this.files=[]
				this.upimg=false
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
					cancel: "取消",
					buttons: btnArray
				}, function(e) {
					var index = e.index;
					switch(index) {
						case 1:
							that.camera();
							break;
						case 2:
							that.album();
							break;
					}
				});
			},
			camera: function() {
				var that = this
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					//成功
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						var img_name = entry.name;
						var img_path = entry.toLocalURL();
						that.upsrc=img_path
						that.upimg=!that.upimg
						that.upload_img(img_path);
					}, function(e) {
						alert("读取拍照文件错误：" + e.message);
					});

				}, function(e) {
					alert("失败：" + e.message);
				}, {
					filename: '_doc/camera/',
					index: 1
				});
			},
			album: function() {
				var that = this
				plus.gallery.pick(function(path) {
					that.upsrc=path
					that.upimg=!that.upimg
					that.upload_img(path);
				}, function(e) {
					alert("取消选择图片");
				}, {
					filter: "image"
				});
			},
			upload_img: function(p) {
				var that = this
				var n = p.substr(p.lastIndexOf('/') + 1);
				that.files.push({
					name: "uploadkey",
					path: p
				});
				//开始上传
				that.start_upload();
			},
			start_upload: function() {
				var that = this
				if(that.files.length <= 0) {
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
		},
		computed:{
			service(){
				return this.$store.state.service
			},
			bottomtwoid(){
				return this.$store.state.bottomtwoid
			}
		}
	}
</script>

<style lang="scss">
	.tindex {
		input[type=submit]{
			border: 0;
			background: none;
			color: white;
		}
		#img1{
			height: 100%;
		}
		.tindex-top {
			height: 6.2rem;
			width: 100%;
			background: url(../../../static/tindex.png) repeat-x;
			background-size: 100% 100%;
			overflow: hidden;
			.img-box {
				height: 2.9rem;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: .7rem auto 1.2rem;
				.gocream {
					width: 1.4rem;
				}
				.creamok {
					height: 2.9rem;
					box-shadow: 0 0 2px 4px #1c77c8;
				}
			}
			.tindex-setting {
				display: flex;
				font-size: .25rem;
				color: white;
				justify-content: space-between;
				margin: 0 1.6rem;
				.setting-group {
					display: flex;
					align-items: center;
				}
				img {
					height: .4rem;
					margin-right: .12rem;
				}
			}
		}
		.tindex-bottom {
			margin: .35rem .35rem 0;
			.bottom-title {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #828282;
				font-size: .3rem;
				font-weight: 600;
				margin-bottom: .4rem;
				img {
					height: .45rem;
					margin-right: .1rem;
				}
			}
			.bottom-group {
				display: flex;
				margin: .2rem 0;
				color: #828282;
				line-height: .35rem;
				span:first-of-type {
					width: .4rem;
				}
			}
		}
	}
</style>