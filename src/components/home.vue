<template>
	<div class="wrapper index">
		<header class="header">
			<span></span>
			<div>美丽南钢</div>
			<span></span>
		</header>
		<div class="main">
			<div class="centercircle" v-show="groupshow">
				<div class="group ">
					<img src="../../static/yuan.png">
					<span class="name">美南丽钢</span>
				</div>
				<transition name='tran1'>
					<div class="group" v-show="groupshow" @click="opennew('yindex',1)">
						<img src="../../static/home_03.png">
						<div class="name1"><span>居民</span><span>随手拍</span></div>
					</div>
				</transition>
				<transition name='tran2'>
					<div class="group width12" v-show="groupshow" @click="opennew('login')">
						<img src="../../static/home_06.png">
						<div class="name1"><span>环保</span><span>小卫士</span></div>
					</div>
				</transition>
				<transition name='tran3'>
					<div class="group width12" v-show="groupshow" @click="opennew('login')">
						<img src="../../static/home_06.png">
						<div class="name1"><span>志愿</span><span>督察员</span></div>
					</div>
				</transition>
				<transition name='tran4'>
					<div class="group width12" v-show="groupshow" @click="opennew('login')">
						<img src="../../static/home_06.png">
						<div class="name1"><span>社区</span><span>楼栋长</span></div>
					</div>
				</transition>
				<transition name='tran5'>
					<div class="group width12" v-show="groupshow" @click="opennew('login')">
						<img src="../../static/home_06.png">
						<div class="name1"><span>社区</span><span>网格员</span></div>
					</div>
				</transition>
				<transition name='tran6'>
					<div class="group width12" v-show="groupshow" @click="opennew('login')">
						<img src="../../static/home_06.png">
						<div class="name1"><span>环卫</span><span>工作者</span></div>
					</div>
				</transition>
				<transition name='tran7'>
					<div class="group width12" v-show="groupshow" @click="opennew('login')">
						<img src="../../static/home_06.png">
						<div class="name1"><span>综合</span><span>执法队</span></div>
					</div>
				</transition>
				<transition name='tran8'>
					<div class="group width12" v-show="groupshow" @click="opennew('login')">
						<img src="../../static/home_06.png">
						<div class="name1"><span>城管</span><span>中心</span></div>
					</div>
				</transition>
				<transition name='tran9'>
					<div class="group width12" v-show="groupshow" @click="opennew('login')">
						<img src="../../static/home_06.png">
						<div class="name1"><span>街办</span><span>管理员</span></div>
					</div>
				</transition>
			</div>
		</div>
		<footer class="footer">
			<p>版权所有：南昌市青山湖区南钢街道办事处</p>
		</footer>
	</div>
</template>

<script>
	export default {
		name: 'myhome',
		data() {
			return {
				groupshow: false
			}
		},
		mounted() {
			var that = this
			that.groupshow = true
			var mynav = []
			$.ajax({
				type: "get",
				url: that.service + "/queryCtypeOne",
				async: true,
				dataType: 'json',
				success: function(res) {
					for(var i = 0; i < res.data.length; i++) {
						var myjson = {
							name: '' + res.data[i].ctypeTitle + '',
							id: '' + res.data[i].ctypeId + ''
						}
						mynav.push(myjson)
					}
					that.$store.state.bottomone = mynav
				}
			});
			var cuserRole = localStorage.getItem('cuserRole')
			function plusReady(){
				that.$store.state.uuid=plus.device.uuid
			}
			if(window.plus){
				plusReady();
			}else{
				document.addEventListener("plusready",plusReady,false);
			}
			if(cuserRole == 0 || cuserRole == 1 || cuserRole == 2 || cuserRole == 3) {
				that.opennew('tindex', 1)
			} else if(cuserRole == 4) {
				that.opennew('windex')
			} else if(cuserRole == 5) {
				that.opennew('hindex')
			} else if(cuserRole == 6 || cuserRole == 7) {
				that.opennew('cindex')
			} else if(cuserRole == 8) {
				that.opennew('asearch')
			}
			
		},
		methods: {
			opennew: function(target, type) {
				if(type == 1) {
					this.$store.state.usertype = 1
				} else {
					this.$store.state.usertype = 0
				}
				this.$router.push({
					name: target
				})
			}
		},
		computed: {
			service() {
				return this.$store.state.service
			},
			uuid(){
				return this.$store.state.uuid
			}
		}
	}
</script>

<style lang="scss">
	@for $i from 1 through 9 {
		.tran#{$i}-enter-active,
		.tran#{$i}-leave-active {
			transition: all .25s * $i ease-in-out;
		}
	}
	
	@for $i from 1 through 9 {
		.tran#{$i}-enter,
		.tran#{$i}-leave {
			opacity: 0;
		}
	}
	
	html,
	body,
	.wrapper {
		width: 100%;
		height: 100%;
		font-size: .2rem;
		padding: 0px;
		margin: 0px;
		max-width: 750px;
		margin: 0 auto;
	}
	
	.header {
		display: flex;
		height: .7rem;
		align-items: center;
		font-size: .3rem;
		color: #ffffff;
		padding: 0 .24rem;
		width: 100%;
		box-sizing: border-box;
	}
	
	.header div {
		flex: 1;
		text-align: center;
	}
	
	.header span {
		display: flex;
		align-items: center;
	}
	
	.footer {
		position: fixed;
		bottom: 0px;
		align-items: center;
		height: 1rem;
		width: 100%;
		left: 0;
	}
	
	.main {
		height: calc(100% - .7rem);
	}
	
	.index {
		background: url(../../static/bgimg.jpg) no-repeat;
		background-size: 100% 100%;
	}
	/*.index .main {
		display: flex;
		align-items: center;
		justify-content: center;
	}*/
	
	.index .width12 {
		width: 1.2rem;
		height: 1.2rem;
	}
	
	.index .centercircle {
		position: relative;
		width: 2.8rem;
		height: 2.8rem;
		top: calc(50% - 1.4rem);
		left: calc(50% - 1.4rem);
	}
	
	.index .centercircle img {
		width: 100%;
		height: 100%;
	}
	
	.index .group {
		color: rgb(4, 158, 255);
	}
	
	.index .group:nth-of-type(1) {
		width: 2.8rem;
		height: 2.8rem;
		color: #FFFFFF;
		font-size: 0.48rem;
		top: -.9rem;
		right: .1rem
	}
	
	.index .group:nth-of-type(2) {
		width: 1.5rem;
		height: 1.5rem;
		top: -2.9rem;
		right: .7rem
	}
	
	.index .group:nth-of-type(3) {
		top: -1.8rem;
		left: 2.8rem;
	}
	
	.index .group:nth-of-type(4) {
		left: 3.4rem;
	}
	
	.index .group:nth-of-type(5) {
		top: 1.7rem;
		left: 3rem;
	}
	
	.index .group:nth-of-type(6) {
		top: 2.6rem;
		left: 1.6rem;
	}
	
	.index .group:nth-of-type(7) {
		top: 2.6rem;
	}
	
	.index .group:nth-of-type(8) {
		top: 1.8rem;
		left: -1.4rem;
	}
	
	.index .group:nth-of-type(9) {
		right: 3.4rem;
	}
	
	.index .group:nth-of-type(10) {
		top: -1.8rem;
		left: -1.4rem;
	}
	
	.index .group {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.index .name {
		position: absolute;
		font-size: 0.5rem;
		font-weight: bold;
		width: 1.4rem;
		letter-spacing: 6px;
		padding-left: 0.3rem;
	}
	
	.index .name1 {
		position: absolute;
		font-size: 0.24rem;
		font-weight: bold;
		display: flex;
		width: 0.8rem;
		flex-wrap: wrap;
		line-height: 0.35rem;
		justify-content: center;
	}
	
	.index .footer {
		color: #FFFFFF;
		display: flex;
		justify-content: center;
	}
	
	.index .circle {
		width: .1rem;
		height: .1rem;
		margin-left: .06rem;
	}
</style>