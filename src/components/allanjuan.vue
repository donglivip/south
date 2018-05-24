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
		<div id="head">
				<span @click="back">
					<img src="../../static/back.png"/>
				</span>
				<div>美丽南钢</div>
				<span></span>
			</div>
		<div id="main">
			<div class="tselect-top">
				<div class="top-nav" :class="swiperindex==3?'active':''" @click="toswiper(3)">
					退回案卷
				</div>
				<div class="top-nav" :class="swiperindex==0?'active':''" @click="toswiper(0)">
					未受理案卷
				</div>
				<div class="top-nav" :class="swiperindex==1?'active':''" @click="toswiper(1)">
					未整改案卷
				</div>
				<div class="top-nav" :class="swiperindex==2?'active':''" @click="toswiper(2)">
					已整改案卷
				</div>
			</div>
			<calendar v-model='startshow' :defaultDate="defaultDate" @change="startchang"></calendar>
			<div class="time-box">
				<div class="time-left">
					<div class="left-box">
						<div class="box" @click="navshow('0')">
							{{community}}
							<img src="../../static/arrbottom.png" />
						</div>
						<span class="hr"></span>
						<div class="box" @click="navshow('1')">
							{{grid}}
							<img src="../../static/arrbottom.png" />
						</div>
					</div>
					<div class="left-box">
						<div class="box" @click="timeshow(0)">
							{{starttime==''?'开始时间':starttime}}
							<img src="../../static/arrbottom.png" />
						</div>
						<span class="hr"></span>
						<div class="box" @click="timeshow(1)">
							{{endtime==''?'结束时间':starttime}}
							<img src="../../static/arrbottom.png" />
						</div>
					</div>
				</div>
				<div class="box-go" @click="navshow('2')">
					{{navtext}}
				</div>
			</div>
			<swiper :options="swiperOption" ref="mySwiper" class='swiper-no-swiping'>
				<!-- 这部分放你要渲染的那些内容 -->
				<swiper-slide>
					<div class="box-group">
						<div class="group" @click="opennew('cbackdetail')">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle  width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
						<div class="group ">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
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
									<img src="../../static/prev.png" />
									<div class="state wwang">
										<span>整改前</span>
									</div>
								</div>
								<div class="img-group" @click="upload('2')">
									<img src="../../static/uploadselect.png" id='img2' />
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
									<img src="../../static/prev.png" />
									<div class="state wwang">
										<span>整改前</span>
									</div>
								</div>
								<div class="img-group">
									<img src="../../static/prev.png" />
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
									<img src="../../static/prev.png" />
									<div class="state wwang">
										<span>整改前</span>
									</div>
								</div>
								<div class="img-group">
									<img src="../../static/prev.png" />
									<div class="state wwang">
										<span>整改后</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="box-group">
						<div class="group" @click="opennew('cbackdetail')">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle  width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
						<div class="group ">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../static/shanchu.png" />
						</div>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<transition name='nav'>
			<div class="bottom-nav" v-show="navboo" @click="navshow(0)">
				<div class="nav-group">
					<div class="sub-nav" v-for="(val,index) in navdata" @click.stop="navchange(val.name,index)" :class="navindex==index?'active':''">
						{{val.name}}
					</div>
					<div class="sub-nav clear" @click.stop="gosearch">
						搜索
					</div>
				</div>
			</div>
		</transition>
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
				navtext: '选择分类',
				navindex: -1,
				community:'选择社区',
				grid:'选择网格',
				texttype:'0'
			}
		},
		components: {
			swiper,
			swiperSlide,
			BootomNav: resolve => require(['./bottom-nav'], resolve)
		},
		mounted() {
			this.$store.state.tfoot = 4
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
			navdata() {
				return this.$store.state.navdata
			}
		},
		methods: {
			back:function(){
				this.$router.back()
			},
			navchange: function(id, index) {
				console.log(this.texttype)
				this.navindex = index
				if(this.texttype==0){
					this.community=id
				}else if(this.texttype==1){
					this.grid=id
				}else{
					this.navtext = id
				}
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			navshow: function(num) {
				this.navboo = !this.navboo
				this.texttype = num
				console.log(num)
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
					this.navshow('0')
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
		.time-left{
			flex: 1;
			display: flex;
			flex-direction: column;
			.left-box{
				display: flex;
				align-items: center;
				margin: .1rem 0;
			}
		}
		.time-box{
			height: auto;
			padding: .2rem 0;
		}
		.bottom-nav {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, .5);
			z-index: 999;
			.nav-group {
				position: absolute;
				bottom: 0;
				left: 0;
				background: white;
				width: 100%;
				.sub-nav {
					width: 100%;
					height: .7rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 1px solid ghostwhite;
				}
				.clear {
					background: #1e81d2;
					color: white;
					height: .8rem;
				}
				.active {
					background: #1e81d2;
					color: white;
				}
			}
		}
		.group img {
			height: .35rem;
		}
		.box-group .group {
			background: #FFFFFF;
			margin: .2rem 0;
			height: .8rem;
			display: flex;
			align-items: center;
			box-shadow: 0 2px 2px 2px gainsboro;
		}
		.riqi {
			display: flex;
			align-items: center;
			margin: 0 .2rem 0 .34rem;
		}
		.text {
			width: 4.4rem;
		}
		.width12 {
			width: .17rem;
			height: .17rem;
			border-radius: 50%;
			margin-right: .35rem;
		}
		.group:nth-of-type(1) .circle {
			background: blue;
		}
		.group:nth-of-type(2) .circle {
			background: yellow;
		}
		.group:nth-of-type(3) .circle {
			background: red;
		}
		.group:nth-of-type(4) .circle {
			background: pink;
		}
		.group:nth-of-type(5) .circle {
			background: peru;
		}
		.group:nth-of-type(6) .circle {
			background: green;
		}
		.back-group {
			background: white;
			width: 100%;
			margin-top: .15rem;
			box-shadow: 0 2px 2px 2px gainsboro;
			height: .95rem;
			display: flex;
			align-items: center;
			font-size: .25rem;
			.circle {
				width: .2rem;
				height: .2rem;
				border-radius: 50%;
				background: #00b7ee;
				margin: 0 .22rem 0 .34rem;
			}
			.date {
				width: 2rem;
			}
			&:nth-of-type(1n) .circle {
				background: #00b7ee;
			}
			&:nth-of-type(2n) .circle {
				background: #e39b00;
			}
			&:nth-of-type(3n) .circle {
				background: #ff5c5c;
			}
			&:nth-of-type(4n) .circle {
				background: #a8f247;
			}
			&:nth-of-type(5n) .circle {
				background: #a264ff;
			}
			&:nth-of-type(6n) .circle {
				background: #00b7ee;
			}
			&:nth-of-type(7n) .circle {
				background: #ff6262;
			}
			&:nth-of-type(8n) .circle {
				background: #b17dff;
			}
		}
		.wwang {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.grey {
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