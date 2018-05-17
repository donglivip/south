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
						<div class="group" @click="opennew('hworkdetail')">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../../static/shanchu.png"/>
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../../static/shanchu.png"/>
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../../static/shanchu.png"/>
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle  width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../../static/shanchu.png"/>
						</div>
						<div class="group ">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../../static/shanchu.png"/>
						</div>
						<div class="group">
							<div class="riqi">
								<div class="circle width12"></div>
								<span>20110204</span>
							</div>
							<span class="text">环卫工作者清理垃圾</span>
							<img src="../../../static/shanchu.png"/>
						</div>
					</div>			
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
				alertboo:false
    }
  },
  mounted(){
  	this.$store.state.tfoot=2
  },
  methods:{
  	alerttab:function(){
  		this.alertboo=!this.alertboo
  	},
		opennew:function(target){
			this.$router.push({
				name:target
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
		
</style>
