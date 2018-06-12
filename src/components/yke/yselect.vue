<template>
	<div id="wrapper" class="tselect">
		<transition name='alert'>
			<div class="alert" v-show="alertboo" @click="alerttab">
				<div class="alert-inner">
					<div class="alert-text">
						日期填写不完整
					</div>
					<div class="alert-setting">
						<div class="setting-group">
							确定
						</div>
					</div>
				</div>
			</div>
		</transition>
		<t-head></t-head>
		<div id="main">
			<calendar v-model='startshow' :defaultDate="defaultDate" @change="startchang"></calendar>
			<div class="time-box">
				<div class="box" @click="timeshow(0)">
					{{starttime==''?'开始时间':starttime}}
					<img src="../../../static/arrbottom.png" />
				</div>
				<span class="hr"></span>
				<div class="box" @click="timeshow(1)">
					{{endtime==''?'结束时间':endtime}}
					<img src="../../../static/arrbottom.png" />
				</div>
				<div class="box-go" @click="gosearch">
					<img src="../../../static/search.png" /> 搜索
				</div>
			</div>
			<div class="select-group" v-for="val in mydata" @click="opennew('changedetail',val.cfileId)">
				<div class="group-inner">
					<div class="group-title">
						{{val.createTime1}}{{val.cgridName}}
					</div>
					<div class="img-box">
						<div class="img-group">
							<img :src="val.cfileDealPrevImg1 | myimg" />
							<div class="state">
								整改前
							</div>
						</div>
						<div class="img-group">
							<img src="../../../static/photo.png" />
							<div class="state">
								游客不可上传整改后照片
							</div>
						</div>
					</div>
				</div>
			</div>
			<p v-if="mydata.length==0">
				暂无案卷
			</p>
		</div>
		<transition name='nav'>
			<bootom-nav v-show='navboo' v-on:navshow='navshow'></bootom-nav>
		</transition>
		<t-foot></t-foot>
	</div>
</template>

<script>
	export default {
		name: 'yselect',
		data() {
			return {
				defaultDate: new Date(),
				starttime: '',
				endtime: '',
				startshow: false,
				timety: 0,
				alertboo: false,
				uploadtarget: '',
				navboo: false,
				navtext: '分类',
				mydata: [],
				cuserCode: ''
			}
		},
		components: {
			THead: resolve => require(['../tourists/head'], resolve),
			TFoot: resolve => require(['./yfoot'], resolve),
			BootomNav: resolve => require(['../bottom-nav'], resolve)
		},
		mounted() {
			var that = this
			this.$store.state.tfoot = 2
			this.myajax(0)
			function plusReady(){
				// 弹出系统等待对话框
				var w = plus.nativeUI.showWaiting( "加载中..." );
			}
			if(window.plus){
				plusReady();
			}else{
				document.addEventListener("plusready",plusReady,false);
			}
		},
		computed: {
			service() {
				return this.$store.state.service;
			},
			uuid() {
				return this.$store.state.uuid
			}
		},
		methods: {
			opennew: function(target, id) {
				this.$store.state.windexid = id
				this.$router.push({
					name: target
				})
			},
			myajax: function(type) {
				var that = this
				function plusReady() {
					var ajaxJson = {
						cuserCode: that.uuid,
						cfileResult: type,
						createTime1: that.starttime,
						handingTime1: that.endtime
					}
					if(that.starttime==''){
						delete ajaxJson.createTime1
					}
					if(that.endtime==''){
						delete ajaxJson.handingTime1
					}
					$.ajax({
						type: "post",
						url: that.service + "/queryByCfilePojo",
						dataType: 'json',
						data: ajaxJson,
						success: function(res) {
							that.mydata = res.data
							function plusReady(){
								// 弹出系统等待对话框
								 plus.nativeUI.closeWaiting();
							}
							if(window.plus){
								plusReady();
							}else{
								document.addEventListener("plusready",plusReady,false);
							}
						}
					});
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}

			},
			navshow: function(id) {
				this.navboo = !this.navboo
				this.navtext = id
			},
			toswiper: function(index) {
				this.swiperindex = index
				this.swiper.slideTo(index, 1000, false)
				if(index == 0) {
					this.myajax(2)
				} else {
					this.myajax(0)
				}
			},
			startchang: function(date, formatDate) {
				if(this.timety == 0) {
					this.starttime = formatDate
				} else {
					this.endtime = formatDate
				}
			},
			timeshow: function(type) {
				this.startshow = true
				this.timety = type
			},
			gosearch: function() {
				if(this.starttime == '' || this.endtime == '') {
					this.alerttab()
					return
				}
				this.myajax()
			},
			alerttab: function() {
				this.alertboo = !this.alertboo
			},
			upload: function(target) {
				var that = this
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
				var that = this
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					//成功
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						var img_name = entry.name; //获得图片名称
						var img_path = entry.toLocalURL(); //获得图片路径
						document.getElementById('a' + that.uploadtarget).setAttribute('src', img_path)
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
				var that = this
				plus.gallery.pick(function(path) {
					that.upload_img(path);
					document.getElementById('a' + that.uploadtarget).setAttribute('src', path)
					alert(path)
				}, function(e) {
					alert("取消选择图片");
				}, {
					filter: "image"
				});
			},
			upload_img: function() {
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
				if(this.files.length <= 0) {
					plus.nativeUI.alert("没有添加上传文件！");
					return;
				}
				//原生的转圈等待框
				var wt = plus.nativeUI.showWaiting();
				var task = plus.uploader.createUpload(server, {
						method: "POST"
					},
					function(t, status) { //上传完成
						if(status == 200) {
							//资源
							var responseText = t.responseText;
							//转换成json
							var json = eval('(' + responseText + ')');
							//上传文件的信息
							var files = json.data;
							wt.close();
						} else {
							alert("上传失败：" + status);
							//关闭原生的转圈等待框
							wt.close();
						}
					});
				task.addData("uid", this.getUid());
				for(var i = 0; i < this.files.length; i++) {
					var f = files[i];
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
	.tselect {
		background: #eeeeee;
		p {
			text-align: center;
		}
		.type {
			display: flex;
			align-items: center;
			img {
				height: .1rem!important;
				width: auto!important;
				margin: 0 .05rem!important;
			}
		}
		.tselect-top {
			display: flex;
			background: #FFFFFF;
			.top-nav {
				flex: 1;
				height: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: .26rem;
				box-sizing: border-box;
				font-weight: 500;
				transition: all .3s;
				border-bottom: 2px solid #FFFFFF;
			}
			.active {
				color: #1e81d2;
				border-bottom: 2px solid #1e81d2;
			}
		}
		.time-box {
			display: flex;
			align-items: center;
			height: 1.1rem;
			padding-left: .3rem;
			.box {
				height: .5rem;
				width: 2rem;
				border: 2px solid #1e81d2;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				img {
					height: .1rem;
					margin-left: .2rem;
				}
			}
			.box-go {
				width: 1.5rem;
				height: .5rem;
				background: #1e81d2;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 .3rem 0 .4rem;
				img {
					height: .28rem;
					margin-right: .14rem;
				}
			}
			.hr {
				height: 2px;
				background: #1e81d2;
				width: .5rem;
			}
		}
		.select-group {
			background: white;
			padding-bottom: .3rem;
			margin-bottom: .24rem;
			.group-inner {
				margin: 0 .34rem;
			}
			.group-title {
				line-height: .8rem;
				font-size: .3rem;
				border-bottom: 1px solid #b8b8b8;
			}
			.img-box {
				display: flex;
				justify-content: space-between;
				img {
					width: 3rem;
					height: 1.8rem;
					margin-top: .3rem;
				}
				.state {
					line-height: .5rem;
					text-align: center;
					border: 1px solid #b8b8b8;
					border-top: 0;
					margin-top: -2px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.upload {
					background: #eeeeee;
					padding: 0 .25rem;
					color: gray;
					height: .35rem;
					line-height: .35rem;
					margin-left: .3rem;
				}
			}
		}
	}
</style>