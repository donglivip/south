<template>
	<div id="wrapper" class="newdetil">
		<div id="head">
			<span @click="back">
					<img src="../../static/back.png"/>
				</span>
			<div>美丽南钢</div>
			<span></span>
		</div>
		<div id="main">
			<div class="group">
				<div class="title">
					{{mydata.cmessageTitle}}
				</div>
				<div class="text">
					{{mydata.cmessageContent}}
				</div>
				<div class="time">
					{{mydata.createTime1}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'newdetail',
		data() {
			return {
				mydata: []
			}
		},
		mounted() {
			this.myajax()
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
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.service + "/updateCuserCmessageByPrimaryKeySelective",
					dataType: 'json',
					data: {
						cmessageId: that.newid,
						cuserCmessageId: that.newstwoid
					},
					success: function(res) {
						that.mydata = res.data
					}
				});
			}
		},
		computed: {
			newid() {
				return this.$store.state.newid
			},
			newstwoid() {
				return this.$store.state.newstwoid
			},
			service() {
				return this.$store.state.service
			}
		},
		components: {
			THead: resolve => require(['./tourists/thead'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.newdetil {
		background: #ECECEC;
		.group {
			background: white;
			padding: .15rem;
			.title {
				font-size: .3rem;
				font-weight: 600;
				border-bottom: 1px solid #ECECEC;
				line-height: .5rem;
			}
			.text {
				color: #666666;
				line-height: .4rem;
				height: .8rem;
				margin-top: .2rem;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.time {
				text-align: right;
				margin-top: .1rem;
				margin-right: .2rem;
			}
		}
	}
</style>