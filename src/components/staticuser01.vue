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
		<div id="head">
			<span @click="back">
					<img src="../../static/back.png"/>
				</span>
			<div>美丽南钢</div>
			<span></span>
		</div>
		<div id="main" style="height: calc(100% - .8rem);">
			<div class="time-box" style="padding: 0;">
				<div class="time-left">
					<div class="left-box">
						<div class="box" style="width: 3rem;">
							<input type="text" v-model="uname" placeholder="请输入搜索姓名"/>
							<img src="../../static/arrbottom.png" />
						</div>
						<span class="hr"></span>
						<div class="box" @click="navshow('1')" style="width: 3rem;">
							{{text}}
							<img src="../../static/arrbottom.png" />
						</div>
					</div>
					<div class="left-box">
						<div class="box" @click="timeshow(0)" style="width: 3rem;">
							{{starttime==''?'开始时间':starttime}}
							<img src="../../static/arrbottom.png" />
						</div>
						<span class="hr"></span>
						<div class="box" @click="timeshow(1)" style="width: 3rem;">
							{{endtime==''?'结束时间':starttime}}
							<img src="../../static/arrbottom.png" />
						</div>
					</div>
					<div class="box-go left-box" @click="myajax" style="width: 6.5rem!important;">
					搜索
				</div>
				</div>
				
			</div>
			<table>
				<tr class="title">
					<td>
						姓名
					</td>
					<td>
						类别
					</td>
					<td>
						上传数量
					</td>
					<td>
						处理数量
					</td>
				</tr>
				<tr v-for="val in mydata" v-if="val.count1!=0||val.count2!=0">
					<td>
						{{val.cuserName}}
					</td>
					<td>
						{{val.cuserRole | role}}
					</td>
					<td>
						{{val.count1}}
					</td>
					<td>
						{{val.count2}}
					</td>
				</tr>
			</table>
		</div>
		<transition name='nav'>
			<div class="bottom-nav" v-show="navboo" @click="navshow(0)">
				<div class="nav-group">
					<div class="sub-nav" v-for="(val,index) in bottomdata" @click.stop="navchange(val.text,val.id)" :class="navindex==index?'active':''">
						{{val.text}}
					</div>
					<div class="sub-nav clear" @click="navshow()">
						搜索
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'can',
		data() {
			return {
				starttime: '',
				endtime: '',
				startshow: false,
				timety: 0,
				alertboo: false,
				navboo: false,
				navindex: -1,
				uname: '',
				texttype: '0',
				text:'选择类别',
				myid:'',
				bottomdata: [
					{
						text:'居民',
						id:0
					},
					{
						text:'环保小卫士',
						id:1
					},{
						text:'志愿督察员',
						id:2
					},{
						text:'社区楼栋长',
						id:3
					},{
						text:'社区网格员',
						id:4
					},{
						text:'环卫工作者',
						id:5
					},{
						text:'综合执法队',
						id:6
					},{
						text:'城管中心',
						id:7
					},{
						text:'街办管理员',
						id:8
					}
				],
				mydata:[]
			}
		},
		components: {
			swiper,
			swiperSlide,
			BootomNav: resolve => require(['./bottom-nav'], resolve)
		},
		mounted() {
			this.myajax()
			function plusReady(){
				// 弹出系统等待对话框
				var w = plus.nativeUI.showWaiting( "加载中..." );
			}
			if(window.plus){
				plusReady();
			}else{
				document.addEventListener("plusready",plusReady,false);
			}
		},
		computed: {
			service() {
				return this.$store.state.service
			}
		},
		methods: {
			myajax: function() {
				var that = this
				var dataJson = {
					createTime1: that.starttime,
					handingTime1: that.endtime,
					cuserName: that.uname,
					cuserRole: that.myid
				}
				if(that.starttime == '') {
					delete dataJson.createTime1
				}
				if(that.endtime == '') {
					delete dataJson.handingTime1
				}
				if(that.myid == '') {
					delete dataJson.cuserRole
				}
				if(that.uname == '') {
					delete dataJson.cuserName
				}
				$.ajax({
					type: "post",
					url: that.service + "/queryReportCountAndHandCount",
					dataType: 'json',
					data: dataJson,
					success: function(res) {
						
						for(var i=0;i<res.data[0].length;i++){
							if(res.data[i+1]!=null){
								res.data[0][i].count2=res.data[i+1].count2
							}else{
								res.data[0][i].count2=0
							}
						}
						console.log(res)
						that.mydata = res.data[0]
						function plusReady(){
				// 弹出系统等待对话框
				plus.nativeUI.closeWaiting();
			}
			if(window.plus){
				plusReady();
			}else{
				document.addEventListener("plusready",plusReady,false);
			}
					}
				});
			},
			navchange: function(id, index) {
				this.navindex = index
				this.text=id
				this.myid=index
				this.navshow()
			},
			back: function() {
				this.$router.back()
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			navshow: function(num) {
				var that = this
				this.navboo = !this.navboo
			},
			timeshow: function(type) {
				var that = this
				plus.nativeUI.pickDate(function(e) {
					var d = e.date;
					if(type == 0) {
						that.starttime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
					} else {
						that.endtime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
					}
				}, function(e) {
					console.log("未选择日期：" + e.message);
				});
			},
			gosearch: function() {
				if(this.starttime == '' || this.endtime == '') {
					this.navshow('0')
					this.alerttab()
					return
				}
			},
			alerttab: function() {
				this.alertboo = !this.alertboo
			}
		},
		filters:{
			role:function(value){
				if(value==0){
					return '居民'
				}
				if(value==1){
					return '环保小卫士'
				}
				if(value==2){
					return '志愿督察员'
				}
				if(value==3){
					return '社区楼栋长'
				}
				if(value==4){
					return '社区网格员'
				}
				if(value==5){
					return '环卫工作者'
				}
				if(value==6){
					return '综合执法队'
				}
				if(value==7){
					return '城管中心'
				}
				if(value==8){
					return '街办管理员'
				}
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	.tselect {
		background: #eeeeee;
		.btn {
			position: absolute;
			bottom: .2rem;
			width: calc(100% - .4rem);
			left: .2rem;
			background: #1e81d2;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			height: .8rem;
			border-radius: .1rem;
		}
		table {
			width: 100%;
			background: white;
			td {
				height: .6rem;
				line-height: .6rem;
				font-size: .25rem;
				border: 1px solid #ECECEC;
				text-indent: .15rem;
			}
			tr:first-of-type {
				font-weight: 600;
				font-size: .25rem;
			}
		}
		.time-left {
			flex: 1;
			display: flex;
			flex-direction: column;
			.left-box {
				display: flex;
				align-items: center;
				margin: .1rem 0;
			}
		}
		.time-box {
			height: auto;
			padding: .2rem 0;
		}
		.bottom-nav {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, .5);
			z-index: 999;
			.nav-group {
				position: absolute;
				bottom: 0;
				left: 0;
				background: white;
				width: 100%;
				.sub-nav {
					width: 100%;
					height: .7rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 1px solid ghostwhite;
				}
				.clear {
					background: #1e81d2;
					color: white;
					height: .8rem;
				}
				.active {
					background: #1e81d2;
					color: white;
				}
			}
		}
		.group img {
			height: .35rem;
		}
		.box-group .group {
			background: #FFFFFF;
			margin: .2rem 0;
			height: .8rem;
			display: flex;
			align-items: center;
			box-shadow: 0 2px 2px 2px gainsboro;
		}
		.riqi {
			display: flex;
			align-items: center;
			margin: 0 .2rem 0 .34rem;
		}
		.text {
			width: 4.4rem;
		}
		.width12 {
			width: .17rem;
			height: .17rem;
			border-radius: 50%;
			margin-right: .35rem;
		}
		.group:nth-of-type(1) .circle {
			background: blue;
		}
		.group:nth-of-type(2) .circle {
			background: yellow;
		}
		.group:nth-of-type(3) .circle {
			background: red;
		}
		.group:nth-of-type(4) .circle {
			background: pink;
		}
		.group:nth-of-type(5) .circle {
			background: peru;
		}
		.group:nth-of-type(6) .circle {
			background: green;
		}
		.back-group {
			background: white;
			width: 100%;
			margin-top: .15rem;
			box-shadow: 0 2px 2px 2px gainsboro;
			height: .95rem;
			display: flex;
			align-items: center;
			font-size: .25rem;
			.circle {
				width: .2rem;
				height: .2rem;
				border-radius: 50%;
				background: #00b7ee;
				margin: 0 .22rem 0 .34rem;
			}
			.date {
				width: 2rem;
			}
			&:nth-of-type(1n) .circle {
				background: #00b7ee;
			}
			&:nth-of-type(2n) .circle {
				background: #e39b00;
			}
			&:nth-of-type(3n) .circle {
				background: #ff5c5c;
			}
			&:nth-of-type(4n) .circle {
				background: #a8f247;
			}
			&:nth-of-type(5n) .circle {
				background: #a264ff;
			}
			&:nth-of-type(6n) .circle {
				background: #00b7ee;
			}
			&:nth-of-type(7n) .circle {
				background: #ff6262;
			}
			&:nth-of-type(8n) .circle {
				background: #b17dff;
			}
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
			justify-content: center;
			.box {
				height: .5rem;
				width: 3rem;
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
				input{
					width: 100%;
					height: 100%;
					border: 0;
					text-align: center;
				}
			}
			.box-go {
				
				height: .5rem;
				background: #1e81d2;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
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
		}
	}
</style>