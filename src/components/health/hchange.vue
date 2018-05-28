<template>
  		<div class="hwzhenggai" id="warpper">
  			<t-head></t-head>
			<div id="main">
				<div class="nav">
					<div class="nav-tab" :class="navtype==0?'active':''" @click="tab(0)">
						未整改
					</div>
					<div class="nav-tab" :class="navtype==1?'active':''" @click="tab(1)">
						整改
					</div>
				</div>
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
				</div>
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
  data () {
    return {
      uploadtarget: '',
			server:'http://39.107.70.18/Transportation/uploadDriverImage',
			files:[],
			navboo:false,
			navtext:'分类',
			navtype:0
    }
  },
  mounted(){
  	this.$store.state.tfoot=3
  },
  methods:{
  	tab:function(inedx){
  		this.navtype=inedx
  	},
  			navshow:function(id){
				this.navboo=!this.navboo
				this.navtext=id
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
  	TFoot:resolve => require(['./hfoot'],resolve),
  	BottomNav:resolve => require(['../bottom-nav'],resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	.hwzhenggai .nav{
			display: flex;
			width: 100%;
			height: .8rem;
			background: white;
			.nav-tab{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.active{
				border-bottom: 2px solid #1e81d2;
			}
		}
		header{display: flex;justify-content: space-between;align-items: center;height:1rem;color: #FFFFFF;background:rgb(30,129,214);font-size: .3rem;}
		.hwzhenggai{background: #eeeeee;height: 100%;position: relative;overflow: hidden;}
		.hwzhenggai .group img{height: .35rem;}
		.hwzhenggai .box-group .group{background: #FFFFFF;margin: .2rem 0;height:.8rem;display: flex;align-items: center;box-shadow: 0 2px 2px 2px gainsboro;}
		.hwzhenggai .riqi{display: flex;align-items: center;margin: 0 .2rem 0 .34rem;}
		.hwzhenggai .text{width: 4.4rem;}
		.hwzhenggai .width12{width:.17rem;height: .17rem;border-radius:50%; margin-right:.35rem;}
		.hwzhenggai .group:nth-of-type(1) .circle{background: blue;}
		.hwzhenggai .group:nth-of-type(2) .circle{background: yellow;}
		.hwzhenggai .group:nth-of-type(3) .circle{background: red;}
		.hwzhenggai .group:nth-of-type(4) .circle{background: pink;}
		.hwzhenggai .group:nth-of-type(5) .circle{background: peru;}
		.hwzhenggai .group:nth-of-type(6) .circle{background: green;}
		.hwzhenggai .box-upload{background: #FFFFFF;}
		.hwzhenggai footer{background: #FFFFFF; position: absolute;bottom:.85rem;width:100%;}
		.hwzhenggai .upload{height: 3rem;display: flex;align-items: center;justify-content: space-between;}
		.hwzhenggai .zhenggai{display: flex;flex-direction: column;}
		.hwzhenggai .sc {display: flex;justify-content: space-around;align-items: center;height: .7rem;}
		.hwzhenggai .scbut{width:1.2rem;height: .5rem;background: rgb(221,221,221);display: flex;align-items: center;justify-content: center;color: rgb(173,173,173);}
		.hwzhenggai .zhenggai span{height: .7rem;display: flex;align-items: center;justify-content: center;}
		.hwzhenggai .zhenggaia,.shangchuan{border:1px solid rgb(236,236,236);margin:.3rem;width:3rem;height: 2.65rem;}
		.hwzhenggai .zgz,.scz{height: 1.82rem;}
		.hwzhenggai .sanjiao{height: .12rem;margin-left: .1rem;}
		.hwzhenggai .footerbox-group{border-top: 1px solid rgb(221,221,221);width:100%;display: flex;justify-content: space-between;align-items:center;height: 1rem;}
		.hwzhenggai .footergroup{display: flex; flex-direction: column;align-items:center;margin: 0 .35rem;color:rgb(137,137,137)}
		.hwzhenggai .footergroup img{height: .4rem;margin-bottom:.1rem;}
</style>
