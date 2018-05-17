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
			<div class="tselect-top">
				<div class="top-nav" :class="swiperindex==0?'active':''" @click="toswiper(0)">
					退回案卷
				</div>
				<div class="top-nav" :class="swiperindex==1?'active':''" @click="toswiper(1)">
					预处理案卷
				</div>
				<div class="top-nav" :class="swiperindex==2?'active':''" @click="toswiper(2)">
					待处理案卷
				</div>
				<div class="top-nav" :class="swiperindex==3?'active':''" @click="toswiper(3)">
					已处理案卷
				</div>
			</div>
			<calendar v-model='startshow' :defaultDate="defaultDate" @change="startchang"></calendar>
			<div class="time-box" v-show="swiperindex!=0">
				<div class="box" @click="timeshow(0)">
					{{starttime==''?'开始时间':starttime}}
					<img src="../../../static/arrbottom.png" />
				</div>
				<span class="hr"></span>
				<div class="box" @click="timeshow(1)">
					{{endtime==''?'结束时间':starttime}}
					<img src="../../../static/arrbottom.png" />
				</div>
				<div class="box-go" @click="gosearch">
					<img src="../../../static/search.png" /> 搜索
				</div>
			</div>
			<swiper :options="swiperOption" ref="mySwiper" class='swiper-no-swiping'>
				<!-- 这部分放你要渲染的那些内容 -->
				<swiper-slide>
					<div class="back-group" @click="opennew('cbackdetail')">
						<div class="circle"></div>
						<div class="date">
							20110204
						</div>
						<div class="name">
							玉林社区1号网格
						</div>
					</div>
					<div class="back-group" @click="opennew('cbackdetail')">
						<div class="circle"></div>
						<div class="date">
							20110204
						</div>
						<div class="name">
							玉林社区1号网格
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="select-group">
						<div class="group-inner" @click="opennew('ydetail')">
							<div class="group-title">
								20110204案卷-育林社区1号网格
							</div>
							<div class="img-box">
								<div class="img-group">
									<img src="../../../static/prev.png" />
									<div class="state">
										整改前
									</div>
								</div>
								<div class="img-group" @click="upload('2')">
									<img src="../../../static/uploadselect.png" id='img2' />
									<div class="state">
										<span class="upload">
											上传
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="select-group">
						<div class="group-inner">
							<div class="group-title">
								20110204案卷-育林社区1号网格
							</div>
							<div class="img-box">
								<div class="img-group">
									<img src="../../../static/prev.png" />
									<div class="state wwang">
										<span>整改前</span>
									</div>
								</div>
								<div class="img-group" @click="upload('2')">
									<img src="../../../static/uploadselect.png" id='img2' />
									<div class="state">
										<span class="upload">
											上传
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="select-group">
						<div class="group-inner" @click="opennew('yidetail')">
							<div class="group-title">
								20110204案卷-育林社区1号网格
							</div>
							<div class="img-box">
								<div class="img-group">
									<img src="../../../static/prev.png" />
									<div class="state wwang">
										<span>整改前</span>
									</div>
								</div>
								<div class="img-group">
									<img src="../../../static/prev.png" />
									<div class="state wwang">
										<span>整改后</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="select-group">
						<div class="group-inner">
							<div class="group-title">
								20110204案卷-育林社区1号网格
							</div>
							<div class="img-box">
								<div class="img-group">
									<img src="../../../static/prev.png" />
									<div class="state wwang">
										<span>整改前</span>
									</div>
								</div>
								<div class="img-group">
									<img src="../../../static/prev.png" />
									<div class="state wwang">
										<span>整改后</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<transition name='nav'>
			<bootom-nav v-show='navboo' v-on:navshow='navshow'></bootom-nav>
		</transition>
		<t-foot></t-foot>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'can',
		data() {
			return {
				swiperOption: {},
				swiperindex: 0,
				defaultDate: new Date(),
				starttime: '',
				endtime: '',
				startshow: false,
				timety: 0,
				alertboo: false,
				uploadtarget: '',
				navboo: false,
				navtext: '分类'
			}
		},
		components: {
			swiper,
			swiperSlide,
			THead: resolve => require(['../tourists/thead'], resolve),
			TFoot: resolve => require(['./cfoot'], resolve),
			BootomNav: resolve => require(['../bottom-nav'], resolve)
		},
		mounted() {
			this.$store.state.tfoot = 4
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		methods: {
			opennew:function(target){
				this.$router.push({
					name:target
				})
			},
			navshow: function(id) {
				this.navboo = !this.navboo
				this.navtext = id
			},
			toswiper: function(index) {
				this.swiperindex = index
				this.swiper.slideTo(index, 1000, false)
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
		.back-group{
			background: white;
			width: 100%;
			margin-top: .15rem;
			box-shadow: 0 2px 2px 2px gainsboro;
			height: .95rem;
			display: flex;
			align-items: center;
			font-size:.25rem;
			.circle{
				width: .2rem;
			    height: .2rem;
			    border-radius: 50%;
			    background: #00b7ee;
			    margin: 0 .22rem 0 .34rem;
			}
			.date{
				width: 2rem;
			}
			&:nth-of-type(1n) .circle{
				background: #00b7ee;
			}
			&:nth-of-type(2n) .circle{
				background: #e39b00;
			}
			&:nth-of-type(3n) .circle{
				background: #ff5c5c;
			}
			&:nth-of-type(4n) .circle{
				background: #a8f247;
			}
			&:nth-of-type(5n) .circle{
				background: #a264ff;
			}
			&:nth-of-type(6n) .circle{
				background: #00b7ee;
			}
			&:nth-of-type(7n) .circle{
				background: #ff6262;
			}
			&:nth-of-type(8n) .circle{
				background: #b17dff;
			}
		}
		.wwang{
			display: flex;flex-direction: column;
			align-items: center;
			justify-content: center;
			.grey{
				color: #8a8a8a;
				font-size: .2rem;
				font-weight: 400;
			}
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
					font-size: .25rem;
					font-weight: 600;
				}
				.upload {
					background: #eeeeee;
					padding: .05rem .25rem;
					color: gray;
					height: .35rem;
					line-height: .35rem;
				}
			}
		}
	}
</style>