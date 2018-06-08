<template>
  <div class="workcamera" id="warpper">
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
				<div>
					<div class="box-group">
							<div class="group" v-for="val in workphoto" @click="opennew('hworkdetail',val.cworkId)" v-if="workphoto.length!=0">
								<div class="riqi">
									<div class="circle width12"></div>
									<span>{{val.createTime1}}</span>
								</div>
								<span class="text">{{val.cworkTitle}}</span>
								<img src="../../../static/shanchu.png" @click.stop="workphotod(val.cworkId)" />
							</div>
							<p v-if="workphoto.length==0">暂无数据</p>
						</div>		
				</div>
				</div>

				<footer>
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
					<t-foot></t-foot>
			
					
			</div>
		</div>
</template>

<script>
export default {
  name: 'hwork',
  data () {
    return {
      	uploadtarget: '',
				server:'http://39.107.70.18/Transportation/uploadDriverImage',
				files:[],
				alertboo:false,
				workphoto:'',
				cworkTitle:''
    }
  },
  mounted(){
  	this.$store.state.tfoot=2
  	this.server = this.service + '/uploadworkImage'
  	this.myajax()
  	
  },
  methods:{
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
			},
  	workupload: function() {
				var that = this
				if(that.cworkTitle == '' || that.files == '') {
					function plusReady() {
						// 显示自动消失的提示消息
						plus.nativeUI.toast("请把信息填写完整！");
						return false;
					}
					if(window.plus) {
						plusReady();
					} else {
						document.addEventListener("plusready", plusReady, false);
					}
				}
				$.ajax({
					type: "post",
					url: that.service + "/insertByCworkImg",
					dataType: 'json',
					data: {
						cuserId: localStorage.getItem('userid'),
						cworkTitle: that.cworkTitle,
						cworkImg: that.files
					},
					success: function(res) {
						if(res.status == 200) {
							that.myajax()

							function plusReady() {
								// 显示自动消失的提示消息
								plus.nativeUI.toast("上传完成！");
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
  	alerttab:function(){
  		this.alertboo=!this.alertboo
  	},
		opennew:function(target,id){
			this.$store.state.windexid = id
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
  computed:{
  	tfoot(){
  		return this.$store.state.tfoot
  	},
  	service() {
				return this.$store.state.service
			},
  	windexid() {
				return this.$store.state.windexid
			}
  	
  },
  components:{
  	THead:resolve => require(['../tourists/thead'],resolve),
  	TFoot:resolve => require(['./hfoot'],resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	html,body,.warpper{padding: 0px;margin: 0px; font-size:.2rem;width: 100%;height: 100%;position: relative;}
	.workcamera{overflow: hidden;
	p{
		text-align: center;
		line-height: 1rem;
	}}
</style>
