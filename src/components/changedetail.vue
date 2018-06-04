<template>
	<div id="wrapper" class="cbackdetail">
		<div id="head">
			<span @click="back">
    			<img src="../../static/back.png"/>
    		</span>
			<div>工作照详情</div>
			<span></span>
		</div>
		<div id="main">
			<div class="detail-group">
				<div class="detail-inner">
					<img src="../../static/detail=adress.png" />
					<div class="detail-text">
						{{mydata[0].cgridName}}
					</div>
				</div>
			</div>
			<div class="detail-group">
				<div class="detail-inner">
					<img src="../../static/detail-time.png" />
					<div class="detail-text">
						上报时间：{{mydata[0].createTime1}}
					</div>
				</div>
				<div class="detail-inner">
					<img src="../../static/detail-up.png" />
					<div class="detail-text">
						上报人：{{mydata[0].cuserName}}
					</div>
				</div>
				<div class="detail-inner">
					<img :src="mydata[0].cfileDealPrevImg1 | myimg" class="big-img" />
				</div>
			</div>
			<div class="detail-group" v-if="mydata[1]!=null">
				<div class="detail-inner">
					<img src="../../static/detail-time.png" />
					<div class="detail-text">
						整改时间：{{mydata[1].handlingTime1}}
					</div>
				</div>
				<div class="detail-inner">
					<img src="../../static/detail-up.png" />
					<div class="detail-text">
						整改人：{{mydata[1].cuserName}}
					</div>
				</div>
				<div class="detail-inner">
					<img :src="mydata[1].cfileDealAfterImg1 | myimg" class="big-img" />
				</div>
			</div>
			<div class="detail-group" v-if="mydata[1]==null">
				<div class="detail-inner">
					<img src="../../static/detail-time.png" />
					<div class="detail-text">
						<span>等待上传</span>
					</div>
				</div>
				<div class="detail-inner">
					<img src="../../static/scimggrey.png" class="big-img" @click="upload('1')" id="img1"/>
				</div>
			</div>
			<div class="submit" v-show="cworkImg!=''" @click="myupload">
				上传
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'changedetail',
		data() {
			return {
				navtext: '选择分类',
				mydata:[],
				cworkImg:'',
				uploadtarget: '',
				server:'',
				files:[]
			}
		},
		mounted() {
			this.$store.state.tfoot = 4
			this.server='http://27.54.248.14:8080/uploadworkImage'
			this.myajax()
		},
		methods: {
			myajax:function(){
				var that=this
				$.ajax({
					type: "get",
					url: that.service + "/queryListByCfileId",
					dataType: 'json',
					data: {
						cfileId: that.windexid
					},
					success: function(res) {
						that.mydata=res.data
						console.log(that.mydata)	
					}
				});
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			back: function() {
				this.$router.back()
			},
			navshow: function(id) {
				this.navboo = !this.navboo
				this.navtext = id
			},
			myupload:function(){
				var that=this
				$.ajax({
					type: "post",
					url: that.service + "/updateCfileAndCuserCase",
					dataType: 'json',
					data: {
						cfileId: that.mydata[0].cfileId,
						userId:localStorage.getItem('userid'),
						cfileDealAfterImg1:that.cworkImg
					},
					success: function(res) {
						console.log(JSON.stringify(res))
						if(res.status == 200) {
							that.myajax()
							function plusReady() {
								// 显示自动消失的提示消息
								plus.nativeUI.toast("上传完成！");
								that.cworkImg=''
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
				console.log(that.server)
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
			}
		},
		computed: {
			windexid() {
				return this.$store.state.windexid
			},
			service() {
				return this.$store.state.service
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	.cbackdetail {
		background: #EEEEEE;
		.submit{
			position: absolute;
			bottom: .2rem;
			width: calc(100% - .6rem);
			height: .7rem;
			left: .3rem;
			border-radius: .15rem;
			background: #1e81d2;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		#main {
			height: calc(100% - .7rem);
		}
		.godubmit {
			background: #1e81d2;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: .1rem;
			margin: .6rem .34rem .3rem;
			height: .9rem;
		}
		.arrimg {
			margin-left: .15rem;
		}
		.detail-group {
			background: white;
			margin-bottom: .22rem;
			border-bottom: 1px solid #d4d3d4;
			.detail-inner {
				margin: 0 .34rem;
				display: flex;
				align-items: center;
				padding: .3rem 0;
				border-bottom: 1px solid #d4d3d4;
				&:last-of-type {
					border: 0;
				}
				img {
					height: .25rem;
					margin-right: .25rem;
				}
				.big-img {
					width: 3.8rem;
					height: 2.6rem;
					display: block;
					margin: .25rem auto;
				}
				.detail-text {
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
</style>