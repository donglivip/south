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
			this.server=this.service+'/uploadworkImage'
			this.myajax()
		},
		methods: {
			myajax:function(){
				var that=this
				console.log(that.windexid)
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