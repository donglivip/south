<template>
	<div class="hwzhenggai" id="warpper">
		<t-head></t-head>
		<div id="main">
			<div class="nav">
				<div class="nav-tab" :class="navtype==0?'active':''" @click="tab(0)">
					未整改
				</div>
				<div class="nav-tab" :class="navtype==2?'active':''" @click="tab(2)">
					整改
				</div>
			</div>
			<div class="box-group" v-if="navtype==0">
					<div class="group" @click="opennew('changedetail',val.cfileId)" v-for="val in list">
						<div class="riqi">
							<div class="circle width12"></div>
							<span>{{val.createTime}}</span>
						</div>
						<span class="text">{{val.cmultipleCommunitiesName}}{{val.cgridName}}</span>
						<img src="../../../static/shanchu.png" @click.stop="filephotod(val.cfileId)">
					</div>
					<div class="more"  @click="next()" v-if="pageNum<size">点击加载更多~</div>
			</div>
			<div class="box-group" v-if="navtype==2">
					<div class="group" @click="opennew('changedetail',val.cfileId)" v-for="val in list01">
						<div class="riqi">
							<div class="circle width12"></div>
							<span>{{val.createTime}}</span>
						</div>
						<span class="text">{{val.cmultipleCommunitiesName}}{{val.cgridName}}</span>
						<img src="../../../static/shanchu.png" @click.stop="filephotod(val.cfileId)">
					</div>
					<div class="more"  @click="next()" v-if="pageNum<size">点击加载更多~</div>
			</div>
		</div>
		<footer>
			<div class="box-upload workcamera">
				<div class="upload">
					<img src="../../../static/upload02.png" id="img1" @click="upload('1')">
					<div class="shangchuan">
						<input class="sck" type="text" placeholder="请填写标题" v-model="navtext" readonly="readonly" @click="navshow"></input>
						<div class="sctext" @click="mapshow()"><span>上传</span></div>
					</div>
				</div>
			</div>
		</footer>
		<transition name='nav'>
			<bottom-nav v-show='navboo' v-on:navshow='navshow'></bottom-nav>
		</transition>
		<t-foot></t-foot>
	</div>
	</div>
</template>

<script>
	export default {
		name: 'hchange',
		data() {
			return {
				uploadtarget: '',
				server: 'http://39.107.70.18/Transportation/uploadDriverImage',
				files: [],
				navboo: false,
				navtext: '分类',
				navtype: 0,
				changephoto: [],
				cfileStation: '',
				wimg:'',
				mapboo: false,
				pageNum:0,
				pageSize:10,
				list:[],
				size:'',
				list01:[]
			}
		},
		mounted() {
			this.$store.state.tfoot = 3
			this.server = this.service + '/uploadworkImage'
			this.next()
		},
		methods: {
			mapshow: function(type) {
				this.mapboo = !this.mapboo
				if(type == 1) {
					this.upmy()
				}
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
					// 弹出系统等待对话框
					that.w = plus.nativeUI.showWaiting("上传中...");
						var dataJson = {
							cuserId: localStorage.getItem('userid'),
							cfileDealPrevImg1: that.wimg,
							cfileStation: that.lng + ',' + that.lat,
							ctypeTwoId: that.bottomtwoid
						}
						$.ajax({
							type: "post",
							url: that.service + "/insertCfileAndCuserAreadyRegister",
							dataType: 'json',
							data: dataJson,
							success: function(res) {
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
							},
							error: function(err) {
								console.log(JSON.stringify(err))
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
											that.tab(0)
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
			opennew: function(target, id) {
				this.$store.state.windexid = id
				this.$router.push({
					name: target
				})
			},
			next:function(){
				this.pageNum++
				this.myajax()
			},
			myajax: function() {
				plus.nativeUI.showWaiting('加载中~')
				var that = this
				console.log(this.navtype)
				$.ajax({
					type: "get",
					url: that.service + "/queryListByCuserId",
					dataType: 'json',
					data: {
						cuserId: localStorage.getItem('userid'),
						cfileResult: that.navtype,
						pageNum:that.pageNum
					},
					success: function(res) {
						console.log(res)
						that.size = res.data.pages
						if(that.navtype==0){
							for (var i=0;i<res.data.list.length;i++) {
								that.list.push(res.data.list[i])
							}
						}else{
							for (var i=0;i<res.data.list.length;i++) {
								that.list01.push(res.data.list[i])
							}
						}
						
						plus.nativeUI.closeWaiting()
					}
				});
			},
			tab: function(inedx) {
				this.pageNum=1
				this.navtype = inedx
				this.list=[]
				this.list01=[]
				this.myajax()
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
			}
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			},
			service() {
				return this.$store.state.service
			},
			bottomtwoid() {
				return this.$store.state.bottomtwoid
			},
			lng() {
				return this.$store.state.lng
			},
			lat() {
				return this.$store.state.lat
			}
		},
		components: {
			THead: resolve => require(['../tourists/thead'], resolve),
			TFoot: resolve => require(['./hfoot'], resolve),
			BottomNav: resolve => require(['../bottom-nav'], resolve),
			mapChange: resolve => require(['../mapchange'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.hwzhenggai .nav {
		display: flex;
		width: 100%;
		height: .8rem;
		background: white;
		.nav-tab {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.active {
			border-bottom: 2px solid #1e81d2;
		}
	}
	
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1rem;
		color: #FFFFFF;
		background: rgb(30, 129, 214);
		font-size: .3rem;
	}
	
	.hwzhenggai {
		.workcamera {
			height: 2rem;
			.upload {
				height: 2rem;
			}
		}
		p {
			text-align: center;
			line-height: 1rem;
		}
		background: #eeeeee;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	
	.hwzhenggai .group img {
		height: .35rem;
	}
	
	.hwzhenggai .box-group .group {
		background: #FFFFFF;
		margin: .2rem 0;
		height: .8rem;
		display: flex;
		align-items: center;
		box-shadow: 0 2px 2px 2px gainsboro;
	}
	
	.hwzhenggai .riqi {
		display: flex;
		align-items: center;
		margin: 0 .2rem 0 .34rem;
	}
	
	.hwzhenggai .text {
		width: 4.4rem;
	}
	.box-group{
		height: calc(100% - 2.7rem);
		overflow-y: scroll;
	}
	.hwzhenggai .width12 {
		width: .17rem;
		height: .17rem;
		border-radius: 50%;
		margin-right: .35rem;
	}
	
	.hwzhenggai .group:nth-of-type(1) .circle {
		background: blue;
	}
	
	.hwzhenggai .group:nth-of-type(2) .circle {
		background: yellow;
	}
	
	.hwzhenggai .group:nth-of-type(3) .circle {
		background: red;
	}
	
	.hwzhenggai .group:nth-of-type(4) .circle {
		background: pink;
	}
	
	.hwzhenggai .group:nth-of-type(5) .circle {
		background: peru;
	}
	
	.hwzhenggai .group:nth-of-type(6) .circle {
		background: green;
	}
	
	.hwzhenggai .box-upload {
		background: #FFFFFF;
	}
	
	.hwzhenggai footer {
		background: #FFFFFF;
		position: absolute;
		bottom: .85rem;
		width: 100%;
	}
	
	.hwzhenggai .upload {
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.hwzhenggai .zhenggai {
		display: flex;
		flex-direction: column;
	}
	
	.hwzhenggai .sc {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: .7rem;
	}
	
	.hwzhenggai .scbut {
		width: 1.2rem;
		height: .5rem;
		background: rgb(221, 221, 221);
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgb(173, 173, 173);
	}
	
	.hwzhenggai .zhenggai span {
		height: .7rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.hwzhenggai .zhenggaia,
	.shangchuan {
		border: 1px solid rgb(236, 236, 236);
		margin: .3rem;
		width: 3rem;
		height: 2.65rem;
	}
	
	.hwzhenggai .zgz,
	.scz {
		height: 1.82rem;
	}
	
	.hwzhenggai .sanjiao {
		height: .12rem;
		margin-left: .1rem;
	}
	
	.hwzhenggai .footerbox-group {
		border-top: 1px solid rgb(221, 221, 221);
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1rem;
	}
	
	.hwzhenggai .footergroup {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 .35rem;
		color: rgb(137, 137, 137)
	}
	
	.hwzhenggai .footergroup img {
		height: .4rem;
		margin-bottom: .1rem;
	}
</style>