<template>
	<div id="wrapper" class="cindex">
		<t-head></t-head>
		<div id="main">
			<div class="tselect-top">
				<div class="top-nav" :class="swiperindex==0?'active':''" @click="toswiper(0)">
					<img src="../../../static/c-ji-active.png" class="hactive" />
					<img src="../../../static/c-ji.png" class="hdefault" />
					<span>
							工作轨迹
						</span>
				</div>
				<div class="top-nav" :class="swiperindex==1?'active':''" @click="toswiper(1)">
					<img src="../../../static/huan-gong-active.png" class="hactive" />
					<img src="../../../static/huan-gong.png" class="hdefault" />
					<span>
							工作照
						</span>
				</div>
				<div class="top-nav" :class="swiperindex==2?'active':''" @click="toswiper(2)">
					<img src="../../../static/huan-zheng-active.png" class="hactive" />
					<img src="../../../static/huan-zheng.png" class="hdefault" />
					<span>
							整改照
						</span>
				</div>
			</div>
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide>
					<d-map></d-map>
				</swiper-slide>
				<swiper-slide>
					<div class="workcamera">
						<div class="box-group">
							<div class="group" @click="opennew('hworkdetail')">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">环卫工作者清理垃圾</span>
								<img src="../../../static/shanchu.png" />
							</div>
							<div class="group">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">环卫工作者清理垃圾</span>
								<img src="../../../static/shanchu.png" />
							</div>
							<div class="group">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">环卫工作者清理垃圾</span>
								<img src="../../../static/shanchu.png" />
							</div>
							<div class="group">
								<div class="riqi">
									<div class="circle  width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">环卫工作者清理垃圾</span>
								<img src="../../../static/shanchu.png" />
							</div>
							<div class="group ">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">环卫工作者清理垃圾</span>
								<img src="../../../static/shanchu.png" />
							</div>
							<div class="group">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">环卫工作者清理垃圾</span>
								<img src="../../../static/shanchu.png" />
							</div>
						</div>
						<footer>
							<div class="box-upload">
								<div class="upload">
									<img src="../../../static/upload02.png" id="img1" @click="upload('1')">
									<div class="shangchuan">
										<input class="sck" type="text" placeholder="请填写标题"></input>
										<div class="sctext"><span>上传</span></div>
									</div>
								</div>
							</div>
						</footer>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="hwzhenggai">
						<div class="box-group">
							<div class="group" @click="opennew('changedetail')">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">育林社区1号网格</span>
								<img src="../../../static/shanchu.png">
							</div>
							<div class="group">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">育林社区1号网格</span>
								<img src="../../../static/shanchu.png">
							</div>
							<div class="group">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">育林社区1号网格</span>
								<img src="../../../static/shanchu.png">
							</div>
							<div class="group">
								<div class="riqi">
									<div class="circle  width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">育林社区1号网格</span>
								<img src="../../../static/shanchu.png">
							</div>
							<div class="group ">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">育林社区1号网格</span>
								<img src="../../../static/shanchu.png">
							</div>
							<div class="group">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>20110204</span>
								</div>
								<span class="text">育林社区1号网格</span>
								<img src="../../../static/shanchu.png">
							</div>
						</div>
						<div class="myfoot">
							<div class="box-upload">
								<div class="upload">
									<div class="zhenggai">
										<div class="zhenggaia">
											<img class="zgz" src="../../../static/zgimg.png" id="img1" @click="upload('1')">
											<span>整改前</span>
										</div>
									</div>
									<div class="shangchuan">
										<img class="scz" src="../../../static/scimggrey.png" id="img2" @click="upload('2')">
										<div class="sc">
											<div class="fenlei" @click="navshow"><span>{{navtext}}</span><img class="sanjiao" src="../../../static/sanjiao.png"></div>
											<div class="scbut">上传</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<transition name='nav'>
					<bottom-nav v-show='navboo' v-on:navshow='navshow'></bottom-nav>
				</transition>
		<t-foot></t-foot>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'index',
		data() {
			return {
				swiperOption: {},
				swiperindex: 0,
				navboo:false,
				navtext:'分类'
			}
		},
		mounted() {
			this.$store.state.tfoot = 1
		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			toswiper: function(index) {
				this.swiperindex = index
				this.swiper.slideTo(index, 1000, false)
			},
			navshow: function(id) {
				this.navboo = !this.navboo
				this.navtext = id
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
				});
			},
			album: function() {
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
			},
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		components: {
			swiper,
			swiperSlide,
			THead: resolve => require(['../tourists/thead'], resolve),
			TFoot: resolve => require(['./cfoot'], resolve),
			DMap: resolve => require(['../map'], resolve),
			BottomNav:resolve => require(['../bottom-nav'],resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.cindex {
		footer,.myfoot{
			bottom: 0!important;
		}
		.swiper-container {
			height: calc(100% - 1rem);
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
				font-size: .25rem;
				box-sizing: border-box;
				font-weight: 500;
				transition: all .3s;
				border-bottom: 1px solid #d0cdcb;
				flex-direction: column;
				img {
					width: .45rem;
					margin-bottom: .1rem;
				}
				.hactive {
					display: none;
				}
				.hdefault {
					display: block;
				}
			}
			.active {
				color: #1e81d2;
				border-bottom: 2px solid #1e81d2;
				.hactive {
					display: block!important;
				}
				.hdefault {
					display: none!important;
				}
			}
		}
	}
</style>