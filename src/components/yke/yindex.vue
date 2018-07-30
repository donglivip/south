<template>
	<div id="wrapper" class="tindex">
		<t-head></t-head>
		<div id="main">
			<div class="tindex-top">
				<div class="img-box" @click="upload('1')">
					<img src="../../../static/creame.png" class="gocream" v-show="!upimg" />
					<img :src="upsrc" id="img1" v-show="upimg" />
				</div>
				<div class="tindex-setting">
					<div class="setting-group" @click="clear" v-show="upsrc!=''">
						<img src="../../../static/reset.png" />
						<span>
	    						 取消
	    					</span>
					</div>
					<div class="setting-group" @click="navshow('分类')" v-show="upsrc!=''">
						{{navtext}}
					</div>
					<div class="setting-group" @click="mapshow" v-show="upsrc!=''">
						<img src="../../../static/upload.png" />
						<span>
	    						上传
	    					</span>
					</div>
				</div>
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
		<transition name='bottom'>
			<map-change v-show='mapboo' @mapshow="mapshow"></map-change>
		</transition>
	</div>
</template>

<script>
	import AMap from 'AMap'
	export default {
		name: 'yindex',
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
				w: '',
				wimg: '',
				mapboo:false
			}
		},
		components: {
			THead: resolve => require(['../tourists/head'], resolve),
			TFoot: resolve => require(['./yfoot'], resolve),
			bottomNav: resolve => require(['../bottom-nav'], resolve),
			mapChange: resolve => require(['../mapchange'], resolve)
		},
		mounted() {
			var that = this
			this.$store.state.tfoot = 1
		},
		methods: {
			mapshow:function(type){
				this.mapboo=!this.mapboo
				if(type==1){
					this.submit()
				}
			},
			submit: function(event) {
				if(this.navtext == '选择分类') {
					function plusReady() {
						// 显示自动消失的提示消息
						plus.nativeUI.toast("请选择分类!");
					}
					if(window.plus) {
						plusReady();
					} else {
						document.addEventListener("plusready", plusReady, false);
					}
					return false;
				}
				if(this.wimg == '') {
					function plusReady() {
						// 显示自动消失的提示消息
						plus.nativeUI.toast("请上传图片!");
					}
					if(window.plus) {
						plusReady();
					} else {
						document.addEventListener("plusready", plusReady, false);
					}
					return false;
				}
				var that = this
				// 弹出系统等待对话框
				plus.nativeUI.showWaiting("上传中...");
					var dataJson = {
						cuserCode: that.uuid,
						cuserRole: 0,
						cfileDealPrevImg1: that.wimg,
						cfileStation: that.lng + ',' + that.lat,
						ctypeTwoId: that.bottomtwoid
					}
					$.ajax({
						type: "post",
						url: that.service + "/insertCfileAndCuser",
						dataType: 'json',
						data: dataJson,
						success: function(res) {
							plus.nativeUI.closeWaiting()
							that.upimg = false
							that.upsrc = ''
							that.navtext = '选择分类'
							if(res.status != 200) {
								function plusReady() {
									plus.nativeUI.toast(res.msg)
								}
								if(window.plus) {
									plusReady();
								} else {
									document.addEventListener("plusready", plusReady, false);
								}
							} else {
								function plusReady() {
									plus.nativeUI.toast("上传完成");
								}
								if(window.plus) {
									plusReady();
								} else {
									document.addEventListener("plusready", plusReady, false);
								}
							}
						},
						error: function(error) {
							plus.nativeUI.closeWaiting()
							plus.nativeUI.toast('上传失败')
						}
					});
			},
			navshow: function(name) {
				this.navtext = name
				this.bottomboo = !this.bottomboo
			},
			clear: function() {
				this.files = []
				this.upimg = false
				this.upsrc = ''
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
				//				相机
				var that = this
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					//成功
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						var img_name = entry.name;
						var img_path = entry.toLocalURL();
						//						that.upsrc = img_path
						that.upimg = !that.upimg
						that.upload_img(img_path);
						var img = document.getElementByid("img"); //通过ID获取IMG元素
						var image = new Image(); //new一个image对象
						image.src = img.src;
						//获取大小
						image.onreadystatechange = function() {
							if(image.readyState == "complete") {
								initFileSize = image.fileSize;
								var fileSize = Math.ceil(initFileSize / 1024);
								alert(fileSize + "k")
							}
						}
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
				//				相册
				var that = this
				plus.gallery.pick(function(path) {
					//					that.upsrc = path
					that.upimg = !that.upimg
					that.upload_img(path);
				}, function(e) {
					alert("取消选择图片");
				}, {
					filter: "image"
				});
			},
			upload_img: function(p) {
				var thats = this
				var img = new Image();
				img.src = p; // 传过来的图片路径在这里用。
				img.onload = function() {
					var that = this;
					//生成比例 
					var w = that.width,
						h = that.height,
						scale = w / h;
					w = 800 || w; //480  你想压缩到多大，改这里
					h = w / scale;

					//生成canvas
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');
					$(canvas).attr({
						width: w,
						height: h
					});
					ctx.drawImage(that, 0, 0, w, h);
					thats.upsrc = canvas.toDataURL('image/jpeg', 1 || 0.8)
					thats.wimg = canvas.toDataURL('image/jpeg', 1 || 0.8)
				}
			}
		},
		computed: {
			service() {
				return this.$store.state.service
			},
			bottomtwoid() {
				return this.$store.state.bottomtwoid
			},
			uuid() {
				return this.$store.state.uuid
			},
			lng() {
				return this.$store.state.lng
			},
			lat() {
				return this.$store.state.lat
			}
		}
	}
</script>

<style lang="scss">
	.tindex {
		input[type=submit] {
			border: 0;
			background: none;
			color: white;
		}
		#img1 {
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
				justify-content: space-around;
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