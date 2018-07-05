<template>
	<div id="wrapper" class="cbackdetail">
		<div id="head">
			<span @click="back">
    			<img src="../../static/back.png"/>
    		</span>
			<div>案卷详情</div>
			<span></span>
		</div>
		<div id="main">
			<div class="detail-group" v-if="mydata.length>0">
				<div class="detail-inner">
					<img src="../../static/detail=adress.png" />
					<div class="detail-text">
						{{mydata[0].cmultipleCommunitiesName}} - {{mydata[0].cgridName}}
					</div>
				</div>
			</div>
			<div class="detail-group" v-if="mydata.length>0">
				<div class="detail-inner">
					<img src="../../static/detail-time.png" />
					<div class="detail-text">
						上报时间：{{mydata[0].createTime1}}
					</div>
				</div>
				<div class="detail-inner" v-if="mydata[0].cuserName!=null">
					<img src="../../static/detail-up.png" />
					<div class="detail-text">
						上报人：{{mydata[0].cuserName==null?'本人':mydata[0].cuserName}}
					</div>
				</div>
				<div class="detail-inner">
					<div class="myimg-box">
						<img :src="mydata[0].cfileDealPrevImg1 | myimg"/>
					</div>
					
				</div>
			</div>
			<div class="detail-group" v-if="mydata[1]==null">
				<div class="detail-inner">
					<div id="mymap"></div>
				</div>
			</div>
			<div class="detail-group" v-if="mydata[1]!=null&&userid!=null">
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
					<div class="myimg-box">
						<img :src="mydata[0].cfileDealAfterImg1 | myimg"/>
					</div>
					
				</div>
			</div>
			<div class="detail-group" v-if="mydata[1]==null&&userid!=null">
				<div class="detail-inner">
					<img src="../../static/detail-time.png" />
					<div class="detail-text">
						<span>等待上传</span>
					</div>
				</div>
				<div class="detail-inner">
					<img src="../../static/scimggrey.png" class="big-img" @click="upload('1')" id="img1" style="width: 100%;height: auto;"/>
				</div>
			</div>
			<div class="submit" v-show="cworkImg!=''" @click="myupload">
				上传
			</div>
		</div>
	</div>
</template>

<script>
	import AMap from 'AMap'
	export default {
		name: 'changedetail',
		data() {
			return {
				navtext: '选择分类',
				mydata:[],
				cworkImg:'',
				uploadtarget: '',
				server:'',
				files:[],
				userid:localStorage.getItem('userid')
			}
		},
		mounted() {
			this.server=this.service+'/uploadworkImage'
			this.myajax()
			
		},
		methods: {
			havemap:function(){
				var that=this
				var mapcenter=JSON.parse("["+that.mydata[0].cfileStation+"]")
				var map=new AMap.Map('mymap', {
		          center: mapcenter,
		          zoom: 15
		        })
				var marker = new AMap.Marker({
					title: '提示'
				});
				marker.setMap(map);
				plus.nativeUI.closeWaiting()
			},
			myajax:function(){
				var that=this
				plus.nativeUI.showWaiting('数据加载中...')
				$.ajax({
					type: "get",
					url: that.service + "/queryListByCfileId",
					dataType: 'json',
					data: {
						cfileId: that.windexid
					},
					success: function(res) {
						that.mydata=res.data
						that.havemap()
						
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
				plus.nativeUI.showWaiting('数据上传中...')
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
						if(res.status == 200) {
							that.myajax()
							function plusReady() {
								// 显示自动消失的提示消息
								plus.nativeUI.closeWaiting()
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
					thats.cworkImg = canvas.toDataURL('image/jpeg', 1 || 0.8);
				}
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
		#mymap{
			height: 4rem;
			width: 100%;
		}
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