<template>
	<div id="wrapper" class="windex">
		<t-head></t-head>
		<div id="main">
			<div class="tselect-top">
				<div class="top-nav" :class="swiperindex==0?'active':''" @click="toswiper(0)">
					<img src="../../../static/huan-guiji-active.png" class="wactive" />
					<img src="../../../static/huan-guiji.png" class="wdefault" />
					<span>
						工作轨迹
					</span>
				</div>
				<div class="top-nav" :class="swiperindex==1?'active':''" @click="toswiper(1)">
					<img src="../../../static/huan-gong-active.png" class="wactive" />
					<img src="../../../static/huan-gong.png" class="wdefault" />
					<span>
						工作照
					</span>
				</div>
				<div class="top-nav" :class="swiperindex==2?'active':''" @click="toswiper(2)">
					<img src="../../../static/huan-gong-active.png" class="wactive" />
					<img src="../../../static/huan-gong.png" class="wdefault" />
					<span>
						整改照
					</span>
				</div>
			</div>
			<swiper :options="swiperOption" ref="mySwiper" class='swiper-no-swiping'>
				<swiper-slide>
					<div class="map">
						<div id="map-container"></div>
						<div class="img-box" @click="change">
							<transition name='start'>
								<img src="../../../static/kai.png" v-show="!start" />
							</transition>
							<transition name='start'>
								<img src="../../../static/ting.png" v-show="start" />
							</transition>
						</div>
						<h1 @click="change">
							{{start==false?'开始记录':'停止记录'}}
						</h1>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="workcamera">
						<div class="box-group" style="height: calc(100% - 3rem);overflow-y: scroll;">
							<div class="group" v-for="val in workphoto" @click="opennew('hworkdetail',val.cworkId)" v-if="workphoto.length!=0&&val.cworkTitle!=null">
								<div class="riqi">
									<div class="circle width12"></div>
									<span style="width: auto;">{{val.createTime1}}</span>
								</div>
								<span class="text">{{val.cworkTitle}}</span>
								<img src="../../../static/shanchu.png" @click.stop="workphotod(val.cworkId)" style="margin-right: .2rem;" />
							</div>
							<p v-if="workphoto.length==0">暂无数据</p>
						</div>
						<footer style="bottom: 0;">
							<div class="box-upload">
								<div class="upload">
									<img src="../../../static/upload02.png" id="img1" @click="upload('1')">
									<div class="shangchuan">
										<input class="sck" type="text" placeholder="请填写标题" v-model="cworkTitle"></input>
										<div class="sctext" @click="workupload"><span>上传</span></div>
									</div>
								</div>
							</div>
						</footer>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="hwzhenggai">
						<div class="nav">
							<div class="nav-tab" :class="navtype==2?'active':''" @click="tab(2)">
								整改
							</div>
							<div class="nav-tab" :class="navtype==1?'active':''" @click="tab(1)">
								未整改
							</div>
						</div>
						<div class="box-group" style="height: calc(100% - 2.8rem);overflow-y: scroll;">
							<div class="group" @click="opennew('changedetail',val.cfileId)" v-for="val in changephoto" v-show="changephoto.length!=0&&val.cfileResult==navtype">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>{{val.createTime}}</span>
								</div>
								<span class="text">{{val.cgridName}}</span>
								<img src="../../../static/shanchu.png" @click.stop="filephotod(val.cfileId)">
							</div>
							<p v-if="changephoto.length==0">暂无数据</p>
						</div>
						<footer style="bottom: 0;height: 2rem;">
							<div class="box-upload workcamera" style="height: 2rem;">
								<div class="upload" style="height: 2rem;">
									<img src="../../../static/upload02.png" id="img2" @click="upload('2')">
									<div class="shangchuan">
										<input class="sck" type="text" placeholder="请填写标题" v-model="navtext" readonly="readonly" @click="navshow"></input>
										<div class="sctext" @click="upmy()"><span>上传</span></div>
									</div>
								</div>
							</div>
						</footer>
					</div>

				</swiper-slide>
			</swiper>
		</div>
		<transition name='nav'>
			<bottom-nav v-show='navboo' v-on:navshow='navshow'></bottom-nav>
		</transition>
		<h-foot></h-foot>
	</div>
</template>
<script>
	import AMap from 'AMap'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'windex',
		data() {
			return {
				swiperOption: {},
				swiperindex: 0,
				navboo: false,
				navtext: '分类',
				start: false,
				setime: '',
				mapcenter: '[117.471564,34.366127]',
				map: '',
				workphoto: '',
				server: '',
				cworkImg: '',
				cworkTitle: '',
				changephoto: '',
				marker: '',
				uploadtarget: '',
				files: [],
				navtype: 2,
				cfileStation: '',
				wimg:''
			}
		},
		mounted() {
			this.$store.state.tfoot = 1,
				this.mylocation()
			this.server = this.service + '/uploadworkImage'
			this.myajax()
			var that = this
			that.mynews()
		},
		methods: {
			tab: function(inedx) {
				this.navtype = inedx
			},
			upmy: function() {
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
				function plusReady() {
					// 弹出系统等待对话框
					that.w = plus.nativeUI.showWaiting("上传中...");
					plus.geolocation.getCurrentPosition(function(p) {
						$.ajax({
							type: "post",
							url: that.service + "/insertCfileAndCuserAreadyRegister",
							dataType: 'json',
							data: {
								cuserId:localStorage.getItem('userid'),
								cfileDealPrevImg1:that.wimg,
								cfileStation:p.coords.longitude + ',' + p.coords.latitude,
								ctypeTwoId:that.bottomtwoid
							},
							success: function(res) {
								console.log(JSON.stringify(res))
								if(res.status != 200) {
									alert(res.msg)
								} else {
									function plusReady() {
										plus.nativeUI.closeWaiting();
										plus.nativeUI.toast("上传完成");
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
			workupload: function() {
				var that = this
				if(that.cworkTitle == '' || that.cworkImg == '') {
					function plusReady() {
						// 显示自动消失的提示消息
						plus.nativeUI.toast("请把信息填写完整！");
					}
					if(window.plus) {
						plusReady();
					} else {
						document.addEventListener("plusready", plusReady, false);
					}
					return false;
				}

				function plusReady() {
					// 显示自动消失的提示消息
					plus.nativeUI.showWaiting('上传中');
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
				$.ajax({
					type: "post",
					url: that.service + "/insertByCworkImg",
					dataType: 'json',
					data: {
						cuserId: localStorage.getItem('userid'),
						cworkTitle: that.cworkTitle,
						cworkImg: that.cworkImg
					},
					success: function(res) {
						if(res.status == 200) {
							that.myajax()

							function plusReady() {
								// 显示自动消失的提示消息
								plus.nativeUI.closeWaiting();
							}
							if(window.plus) {
								plusReady();
							} else {
								document.addEventListener("plusready", plusReady, false);
							}
						}
					}
				});
			},
			workphotod: function(id) {
				var that = this
				var btnArray = [{
					title: "删除"
				}, ]; //选择按钮  1 2 3
				plus.nativeUI.actionSheet({
					title: "请选择",
					cancel: "取消",
					buttons: btnArray
				}, function(e) {
					var index = e.index;
					switch(index) {
						case 1:
							$.ajax({
								type: "post",
								url: that.service + "/deleteCorkByCworkId",
								dataType: 'json',
								data: {
									cworkId: id
								},
								success: function(res) {
									if(res.status == 200) {
										function plusReady() {
											// 显示自动消失的提示消息
											plus.nativeUI.toast("删除完成！");
											that.myajax()
										}
										if(window.plus) {
											plusReady();
										} else {
											document.addEventListener("plusready", plusReady, false);
										}
									} else {
										function plusReady() {
											// 显示自动消失的提示消息
											plus.nativeUI.toast("删除失败!");
										}
										if(window.plus) {
											plusReady();
										} else {
											document.addEventListener("plusready", plusReady, false);
										}

									}
								}
							});
							break;
					}
				});

			},
			filephotod: function(id) {
				var that = this
				var btnArray = [{
					title: "删除"
				}, ]; //选择按钮  1 2 3
				plus.nativeUI.actionSheet({
					title: "请选择",
					cancel: "取消",
					buttons: btnArray
				}, function(e) {
					var index = e.index;
					switch(index) {
						case 1:
							$.ajax({
								type: "post",
								url: that.service + "/deleteCorkByCfileId",
								dataType: 'json',
								data: {
									cfileId: id
								},
								success: function(res) {
									if(res.status == 200) {
										function plusReady() {
											// 显示自动消失的提示消息
											plus.nativeUI.toast("删除完成！");
											that.myajax()
										}
										if(window.plus) {
											plusReady();
										} else {
											document.addEventListener("plusready", plusReady, false);
										}
									} else {
										function plusReady() {
											// 显示自动消失的提示消息
											plus.nativeUI.toast("删除失败!");
										}
										if(window.plus) {
											plusReady();
										} else {
											document.addEventListener("plusready", plusReady, false);
										}

									}
								}
							});
							break;
					}
				});

			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "get",
					url: that.service + "/querAllCwork",
					dataType: 'json',
					data: {
						cuserId: localStorage.getItem('userid')
					},
					success: function(res) {
						that.workphoto = res.data
					}
				});
				$.ajax({
					type: "get",
					url: that.service + "/queryListByCuserIdNetwork",
					dataType: 'json',
					data: {
						cuserIdNetwork: localStorage.getItem('userid')
					},
					success: function(res) {
						that.changephoto = res.data[0]
					}
				});
			},
			change: function() {
				var that = this
				this.start = !this.start
				if(this.start) {
					this.setime = setInterval(function() {
						that.havecenter()
					}, 3000)
				} else {
					clearInterval(this.setime)
				}
			},
			mylocation: function() {
				var that = this
				that.map = new AMap.Map('map-container', {
					zoom: 15,
					center: JSON.parse(that.mapcenter)
				})
				that.marker = new AMap.Marker({
					title: '提示'
				});
				that.marker.setMap(that.map);
			},
			havecenter: function() {
				var that = this
				plus.geolocation.getCurrentPosition(function(p) {
					that.mapcenter = '[' + p.coords.longitude + ',' + p.coords.latitude + ']'
					that.map.setCenter(JSON.parse(that.mapcenter));
					that.marker.setPosition(JSON.parse(that.mapcenter));
					$.ajax({
						type: "post",
						url: that.service + "/insertCworkBytxt",
						dataType: 'json',
						data: {
							cuserId: localStorage.getItem('userid'),
							point: that.mapcenter
						},
						success: function(res) {
							console.log('s' + res)
						}
					});
				}, function(e) {
					alert('Geolocation error: ' + e.message);
				});
			},
			opennew: function(target, id) {
				this.$store.state.windexid = id
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
						if(that.swiperindex == 2) {
							that.upload_img02(path);
						} else {
							that.upload_img(path);
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
				var that = this
				plus.gallery.pick(function(path) {
					document.getElementById('img' + that.uploadtarget).setAttribute('src', path)
					if(that.swiperindex == 2) {
						that.upload_img02(path);
					} else {
						that.upload_img(path);
					}
				}, function(e) {
					alert("取消选择图片");
				}, {
					filter: "image"
				});
			},
			upload_img02: function(p) {
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
					thats.wimg = canvas.toDataURL('image/jpeg', 1 || 0.8)
				}
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
							that.cworkImg = that.files
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
			},
			mynews: function() {
				var that = this;
				$.ajax({
					type: "get",
					url: that.service + "/queryCuserMessagePojoByCuserId",
					dataType: 'json',
					data: {
						cuserId: localStorage.getItem('userid')
					},
					success: function(res) {
						if(res.data.length > 0) {
							for(var i = 0; i < res.data.length; i++) {
								if(res.data[i].stystemSatus == 1 && res.data[i].status != 1) {
									console.log(JSON.stringify(res.data[i]))
									that.mypush(res.data[i].cfileId, res.data[i].cmessageId, res.data[i].cuserCmessageId)
									break;
								}
							}
						}
					}
				});
				setTimeout(function() {
					that.mynews()
				}, 100000)
			},
			mypush: function(newid, oneid, twoid) {
				var that = this
				var info = plus.push.getClientInfo();
				plus.push.createMessage('您有新的案卷需要处理,请点击查看!');
				plus.push.addEventListener("click", function(msg) {
					$.ajax({
						type: "post",
						url: that.service + "/updateCuserCmessageByPrimaryKeySelective",
						dataType: 'json',
						data: {
							cmessageId: oneid,
							cuserCmessageId: twoid
						},
						success: function(res) {
							that.$store.state.windexid = newid
							that.$router.push({
								name: 'ydetail'
							})
						},
						error: function(error) {
							console.log(JSON.stringify(res))
						}
					});
				}, false);
			}
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			},
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
			service() {
				return this.$store.state.service
			},
			windexid() {
				return this.$store.state.windexid
			},
			bottomtwoid() {
				return this.$store.state.bottomtwoid
			}
		},
		components: {
			swiper,
			swiperSlide,
			THead: resolve => require(['../tourists/thead'], resolve),
			HFoot: resolve => require(['./wfoot'], resolve),
			BottomNav: resolve => require(['../bottom-nav'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.windex {
		.nav {
			display: flex;
			width: 100%;
			height: .8rem;
			background: white;
		}
		.nav-tab {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.active {
			border-bottom: 2px solid #1e81d2;
		}
		p {
			text-align: center;
			line-height: 1rem;
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
				border-bottom: 2px solid #d6d5d5;
				flex-direction: column;
				img {
					height: .4rem;
					margin-bottom: .1rem;
				}
				.wactive {
					display: none;
				}
			}
			.active {
				color: #1e81d2;
				border-bottom: 2px solid #1e81d2;
				.wactive {
					display: block;
				}
				.wdefault {
					display: none;
				}
			}
		}
		.swiper-container {
			height: 100%;
		}
		.map {
			width: 100%;
			height: 100%;
			position: relative;
			display: flex;
			flex-direction: column;
			#map-container {
				width: 100%;
				flex: 1;
				border-bottom: 1px solid #d5d4d3;
			}
			img {
				display: block;
				width: 1.65rem;
				height: 1.65rem;
			}
			h1 {
				font-size: .35rem;
				text-align: center;
				font-weight: 600;
				margin: .4rem 0;
			}
			.img-box {
				z-index: 555;
				position: relative;
				width: 1.65rem;
				height: 1.65rem;
				margin: -.92rem auto 0;
				border-radius: 50%;
				overflow: hidden;
			}
		}
	}
</style>