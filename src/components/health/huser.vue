<template>
	<div id="wrapper" class="user">
		<t-head></t-head>
		<div id="main">
			<img :src="cuserHeadImg | myimg" class="avatar" id="img1" v-if="cuserHeadImg!='null'"/>
			<img src="../../../static/detail-up.png" class="avatar"v-if=" cuserHeadImg=='null'">
			<div class="name">
				{{name}}
			</div>
			<div class="menu">
				<div class="submenu" @click="opennew('changepwd')">
					<img src="../../../static/user-pwd.png" />
					<span>
    					修改密码
    				</span>
					<img src="../../../static/arrright.png" />
				</div>
				<div class="submenu" @click="opennew('news')">
					<img src="../../../static/news.png" />
					<span>
	    					消息中心
	    				</span>
					<img src="../../../static/arrright.png" />
				</div>
				<div class="submenu" @click="opennew('userinform')">
					<img src="../../../static/user-user.png" />
					<span>
    					修改个人信息
    				</span>
					<img src="../../../static/arrright.png" />
				</div>
				<div class="clear" @click="clear">
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
		data() {
			return {
				uploadtarget: '',
				server: 'http://39.107.70.18/Transportation/uploadDriverImage',
				files: [],
				cuserHeadImg:localStorage.getItem('cuserHeadImg'),
				name:localStorage.getItem('username')
			}
		},
		components: {

		},
		mounted() {
			this.$store.state.tfoot = 4
		},
		methods: {
			clear: function() {
				localStorage.clear()
				this.opennew('home')
			},
			opennew: function(target) {
				this.$router.push({
					name: target
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
				console.log('相机')
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
				console.log('相册')
				var that = this
				plus.gallery.pick(function(path) {
					document.getElementById('img' + that.uploadtarget).setAttribute('src', path)
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
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			}
		},
		components: {
			THead: resolve => require(['../tourists/thead'], resolve),
			TFoot: resolve => require(['./hfoot'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.user {
		.avatar {
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			display: block;
			margin: 1rem auto 0;
		}
		.name {
			font-size: .33rem;
			text-align: center;
			margin-top: .4rem;
			text-align: center;
			font-weight: 500;
		}
		.menu {
			margin: .9rem 0 0 0;
			.submenu {
				margin: 0 .5rem;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #d8d8d8;
				height: .8rem;
				img {
					height: .3rem;
				}
				span {
					flex: 1;
					margin-left: .18rem;
				}
			}
		}
		.clear {
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