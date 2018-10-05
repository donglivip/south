<template>
	<div class="warpper hwxq" style="background: #f4f4f4;">
		<div class="main">
			<header>
				<span @click="back">
					<img src="../../static/back.png"/>
				</span>
				<span>美丽南钢</span>
				<span></span>
			</header>
			<content>
				<div class="box-group" style="height: .8rem;">
					<div class="group">
						<span>{{mydata.cworkTitle==null?'名称暂缺':mydata.cworkTitle}}</span>
						<span>{{mydata.createTime1}}</span>
					</div>
				</div>
				<div class="groupimg myimg-box">
					<img :src="mydata.cworkImg | myimg" v-if="mydata.cworkImg!=null">
					<p v-if="mydata.cworkImg==null">暂无工作照</p>
				</div>

			</content>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hworkdetail',
		data() {
			return {
				mydata: ''
			}
		},
		mounted() {
			var that = this
			$.ajax({
				type: "get",
				url: that.service + "/queryCorkByCworkId",
				dataType: 'json',
				data: {
					cworkId: that.windexid
				},
				success: function(res) {
					that.mydata = res.data[0]
					console.log(res)
				}
			});
		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			back: function() {
				this.$router.back()
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
	html,
	body,
	.warpper {
		background: #f4f4f4;
		padding: 0px;
		margin: 0px;
		font-size: .2rem;
		width: 100%;
		height: 100%;
	}
	
	.hwxq {
		background: rgb(238, 238, 238);
	}
	
	.hwxq header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: .7rem;
		color: #FFFFFF;
		background: rgb(30, 129, 214);
		font-size: .3rem;
	}
	
	.hwxq header img {
		height: .3rem;
	}
	
	.hwxq header span {
		margin: 0 .2rem;
	}
	
	.hwxq .group img {
		height: .35rem;
	}
	
	.hwxq .groupimg {
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 5.6rem;
	}
	
	.hwxq .qlz {
		width: 6.8rem;
	}
	
	.hwxq .box-group {
		background: #FFFFFF;
		box-shadow: 0 0 0 1px #aaa;
	}
	
	.hwxq .box-group .group {
		height: .8rem;
		display: flex;
		justify-content: space-between;
		margin: 0 .35rem .2rem .35rem;
		align-items: center;
	}
	
	.hwxq footer {
		background: #FFFFFF;
		position: absolute;
		bottom: 0px;
		width: 100%;
	}
	
	.hwxq .footerbox-group {
		border-top: 1px solid rgb(221, 221, 221);
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 1rem;
	}
	
	.hwxq .footergroup {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: rgb(137, 137, 137)
	}
	
	.hwxq .footergroup img {
		height: .4rem;
		margin-bottom: .1rem;
	}
</style>