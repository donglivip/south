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
			<div class="detail-group" v-if='mydata.length>0'>
				<div class="detail-inner">
					<img src="../../static/detail=adress.png" />
					<div class="detail-text">
						{{mydata[0].cgridName==null?'名称暂缺':mydata[0].cgridName}}
					</div>
				</div>
			</div>
			<div class="detail-group">
				<div class="detail-inner" v-if='mydata.length>0'>
					<img src="../../static/detail-time.png" />
					<div class="detail-text">
						退回时间：{{mydata[0].createTime1}}
					</div>
				</div>
				<div class="detail-inner" v-if='mydata.length>0'>
					<img src="../../static/detail-up.png" />
					<div class="detail-text">
						上报人：{{mydata[0].cuserName==null?'名称暂缺':mydata[0].cuserName}}
					</div>
				</div>
				<div class="detail-inner" v-if='mydata.length>0'>
					<div class="myimg-box">
						<img :src="mydata[0].cfileDealPrevImg1 | myimg" />
					</div>
				</div>
				<div class="detail-inner">
					<div id="mymap"></div>
				</div>
			</div>
			<div class="detail-group" @click="bottomboo">
				<div class="detail-inner">
					<img src="../../static/index02-active.png"/>
					<div class="detail-text" style="justify-content: flex-end;">
						{{navtext}}
						<img src="../../static/arrright.png" style="margin: 0;margin-left:.2rem;"/>
					</div>
				</div>
			</div>
			<div class="backsubmit" @click="backsubmit">
				提交
			</div>
		</div>
		<transition name='nav'>
			<div class="bottom-nav" v-show="navboo" @click="bottomboo">
				<div class="nav-group" style="height: 100%;overflow-y: scroll;">
					<div class="sub-nav" v-for="(val,index) in noway" @click="bottomok(val.cgridId,val.cgridName)">
						{{val.cgridName}}
					</div>
					<div class="sub-nav clear">
						取消
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import AMap from 'AMap'
	export default {
		name: 'changedetail',
		data() {
			return {
				navtext: '选择网格',
				mydata: [],
				cworkImg: '',
				uploadtarget: '',
				server: '',
				files: [],
				noway:[],
				cgridId:'',
				navboo:false
			}
		},
		mounted() {
			this.server = this.service + '/uploadworkImage'
			this.myajax()
		},
		methods: {
			backsubmit:function(){
				if(this.navtext=='选择网格'){
					plus.nativeUI.toast('请先选择网格')
					return false;
				}
				plus.nativeUI.showWaiting( "数据处理中..." );
				var that = this
				var ajaxJson={
						cgridId: that.cgridId,
						cfileId:that.mydata[0].cfileId,
						cfileResult:0
				}
				$.ajax({
					type: "post",
					url: that.service + "/updateByPrimarykeyAndConfirmingAssignments",
					dataType: 'json',
					data: ajaxJson,
					success: function(res) {
						console.log(res)
						if(res.status==200){
							that.$router.back()
						}else{
							plus.nativeUI.showWaiting('提交错误')
						}
						plus.nativeUI.closeWaiting()
					}
				});
			},
			bottomboo:function(){
				this.navboo=!this.navboo
			},
			bottomok:function(id,name){
				this.cgridId=id
				this.navtext=name
			},
			havemap:function(){
				var that=this
				var mapcenter=JSON.parse("["+that.mydata[0].cfileStation+"]")
				var map=new AMap.Map('mymap', {
		          center: mapcenter,
		          zoom: 15,
							layers: [new AMap.TileLayer.Satellite(),new AMap.TileLayer.RoadNet()]
		        })
				var marker = new AMap.Marker({
					title: '提示'
				});
				marker.setMap(map);
				plus.nativeUI.closeWaiting()
			},
			myajax: function() {
				plus.nativeUI.showWaiting('数据加载中')
				var that = this
				$.ajax({
					type: "get",
					url: that.service + "/queryReturnFileById",
					dataType: 'json',
					data: {
						cfileId: that.windexid
					},
					success: function(res) {
						console.log(res)
						that.mydata = res.data
						that.havemap()
					}
				});
				$.ajax({
					type: "get",
					url: that.service + "/queryCgrid",
					dataType: 'json',
					success: function(res) {
						that.noway = res.data
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
			myupload: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.service + "/updateCfileAndCuserCase",
					dataType: 'json',
					data: {
						cfileId: that.mydata[0].cfileId,
						userId: localStorage.getItem('userid'),
						cfileDealAfterImg1: that.cworkImg
					},
					success: function(res) {
						console.log(res)
						if(res.status == 200) {
							that.myajax()

							function plusReady() {
								// 显示自动消失的提示消息
								plus.nativeUI.toast("上传完成！");
								that.cworkImg = ''
							}
							if(window.plus) {
								plusReady();
							} else {
								document.addEventListener("plusready", plusReady, false);
							}
						}
					}
				});
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
		.backsubmit{
			width: calc(100% - .6rem);
			margin: .2rem .3rem;
			height: .8rem;
			border-radius: .1rem;
			color: white;
			background: #1e81d2;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.bottom-nav{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.5);
		z-index: 999;
		font-size: .35rem;
		overflow-y: scroll;
		height: 100%;
		.nav-group{
			position: absolute;
			bottom: 0;
			left: 0;
			background: white;
			width:100%;
			.sub-nav{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom: 1px solid ghostwhite;
				flex-direction: column;
				height: 1rem;
				background: white;
			}
			span{
				padding: .3rem 0;
			}
			.nav-inner{
				padding: .3rem 0;
			}
			.clear{
				background: #1e81d2;
				color: white;
				height: .8rem;
			}
		}
	}
		#mymap{
			height: 4rem;
			width: 100%;
		}
		.submit {
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