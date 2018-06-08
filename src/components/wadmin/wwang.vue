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
					预处理案卷
				</div>
				<div class="top-nav" :class="swiperindex==1?'active':''" @click="toswiper(1)">
					待处理案卷
				</div>
				<div class="top-nav" :class="swiperindex==2?'active':''" @click="toswiper(2)">
					已处理案卷
				</div>
			</div>
			<!--<calendar v-model='startshow' :defaultDate="defaultDate" @change="startchang"></calendar>-->
			<!--<transition name='alert'>
			<div class="time-box" v-show='swiperindex!=0'>
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
			</transition>-->
			<swiper :options="swiperOption" ref="mySwiper" class='swiper-no-swiping'>
				<!-- 这部分放你要渲染的那些内容 -->
				<swiper-slide>
					<div class="select-group workcamera"style="background: none;">
						<div class="box-group">
							<div class="group" v-for="val in mydata" v-if="val.cfileResult==0" @click="opennew('ydetail',val.cfileId)" >
								<div class="riqi">
									<div class="circle width12"></div>
									<span>{{val.createTime1}}</span>
								</div>
								<span class="text">{{val.cgridName}}</span>
								<img src="../../../static/shanchu.png" @click.stop="filephotod(val.cfileId)"/>
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="select-group" v-for="(val,index) in mydata" v-if="val.cfileResult==1" @click="opennew('changedetail',val.cfileId)">
						<div class="group-inner">
							<div class="group-title">
								{{val.createTime1}}{{val.cgridName}}
							</div>
							<div class="img-box">
								<div class="img-group">
									<img :src="mydata.fileDealPrevImg1 | myimg" />
									<div class="state wwang">
										<span>整改前</span>
									</div>
								</div>
								<div class="img-group" >
									<img src="../../../static/uploadselect.png" :id='["img"+index]' @click.stop="upload(index)"/>
									<div class="state" @click.stop="imgok">
										<span class="upload">
											待上传
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="select-group" v-for="(val,index) in mydata" v-if="val.cfileResult==2" @click="opennew('changedetail',val.cfileId)">
						<div class="group-inner">
							<div class="group-title">
								{{val.createTime1}}{{val.cgridName}}
							</div>
							<div class="img-box">
								<div class="img-group">
									<img :src="mydata.fileDealPrevImg1 | myimg" />
									<div class="state wwang">
										<span>整改前</span>
									</div>
								</div>
								<div class="img-group">
									<img :src="mydata.cfileDealAfterImg1 | myimg" />
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
		<t-foot></t-foot>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'wwang',
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
				navtext: '分类',
				server: '',
				files: [],
				mydata:'',
				cfileDealAfterImg1:''
			}
		},
		components: {
			swiper,
			swiperSlide,
			THead: resolve => require(['../tourists/thead'], resolve),
			TFoot: resolve => require(['./wfoot'], resolve),
		},
		mounted() {
			this.$store.state.tfoot = 2
			this.server=this.service+'/uploadworkImage'
			this.myajax()
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
			service() {
				return this.$store.state.service;
			},
			windexid() {
				return this.$store.state.windexid;
			}
		},
		methods: {
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
			imgok:function(id){
				var that=this
				if(that.cfileDealAfterImg1==''){
					function plusReady(){
						// 显示自动消失的提示消息
						plus.nativeUI.toast( "请点击图片选择上传的图片后再上传");
					}
					if(window.plus){
						plusReady();
					}else{
						document.addEventListener("plusready",plusReady,false);
					}
					return false;
				}
				$.ajax({
					type: "post",
					url: that.service + "/updateCfileAndCuserCase",
					dataType: 'json',
					data: {
						userId: localStorage.getItem('userid'),
						cfileId:id,
						cfileDealAfterImg1:that.cfileDealAfterImg1
					},
					success: function(res) {
						that.myajax(2)
						that.toswiper(0)
					}
				});
			},
			myajax:function(){
				var that=this
				$.ajax({
					type: "get",
					url: that.service + "/queryListByCuserIdNetwork",
					dataType: 'json',
					data: {
						cuserIdNetwork:localStorage.getItem('userid')
					},
					success: function(res) {
						that.mydata=res.data
					}
				});
			},
			opennew: function(target,id) {
				this.$store.state.windexid=id
				this.$router.push({
					name: target
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
				that.files=[]
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
				var that = this
				plus.gallery.pick(function(path) {
					that.upload_img(path);
					document.getElementById('img' + that.uploadtarget).setAttribute('src', path)
					alert(path)
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
				var that=this
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
							alert(that.files)
							that.cfileDealAfterImg1=that.files
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
	.tselect {
		background: #eeeeee;
		.swiper-container{
			margin-top: .2rem;
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
					line-height: .4rem;
					height: .8rem;
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