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
						育林社区1号网格
					</div>
				</div>
			</div>
			<div class="detail-group">
				<div class="detail-inner">
					<img src="../../static/detail-time.png" />
					<div class="detail-text">
						上报时间：2017-09-09
					</div>
				</div>
				<div class="detail-inner">
					<img src="../../static/detail-up.png" />
					<div class="detail-text">
						上报人：李四
					</div>
				</div>
				<div class="detail-inner">
					<img src="../../static/prev.png" class="big-img" />
				</div>
			</div>
			<!--<div class="detail-group">
				<div class="detail-inner">
					<img src="../../static/detail-time.png" />
					<div class="detail-text">
						上报时间：2017-09-09
					</div>
				</div>
				<div class="detail-inner">
					<img src="../../static/up-back.png" />
					<div class="detail-text">
						上传人：张三
					</div>
				</div>
				<div class="detail-inner">
					<img src="../../static/prev.png" class="big-img" />
				</div>
			</div>-->
			<!--未上传-->
			<div class="detail-group">
				<div class="detail-inner">
					<img src="../../static/detail-time.png" />
					<div class="detail-text">
						<span>等待上传</span>
						<span @click="navshow">{{navtext}}</span>
					</div>
				</div>
				<div class="detail-inner">
					<img src="../../static/scimggrey.png" class="big-img" />
				</div>
			</div>
		</div>
		<transition name='nav'>
			<bootom-nav v-show='navboo' v-on:navshow='navshow'></bootom-nav>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'hdetail',
		data() {
			return {
				navboo: false,
				navtext:'选择分类'
			}
		},
		mounted() {
			this.$store.state.tfoot = 4
		},
		methods: {
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
		},
		components: {
			BootomNav: resolve => require(['./bottom-nav'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.cbackdetail {
		background: #EEEEEE;
		
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