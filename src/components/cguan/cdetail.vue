<template>
	<div id="wrapper" class="cdetail">
		<t-head></t-head>
		<div id="main">
			<div class="csearch-top">
				<calendar v-model='startshow' :defaultDate="defaultDate" @change="startchang"></calendar>
				<div class="csearch-inner">
					<div class="csearch-group" @click="timeshow">
						<img src="../../../static/date.png" />
						<input type="text" placeholder="请选择日期" v-model="date" readonly=""/>
						<img src="../../../static/xiaxia.png" style="height: .15rem;width: .27rem;"/>
					</div>
					<div class="go-search flexc">
						查询
					</div>
				</div>
			</div>
			<locus></locus>
		</div>
		<t-foot></t-foot>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				date:'请选择日期',
				startshow: false,
				defaultDate: new Date()
			}
		},
		mounted() {
			this.$store.state.tfoot=2
		},
		methods: {
			timeshow: function(type) {
				this.startshow = true
			},
			startchang: function(date, formatDate) {
				this.date = formatDate
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			}
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			}
		},
		components: {
			THead: resolve => require(['../tourists/thead'], resolve),
			TFoot: resolve => require(['./cfoot'], resolve),
			Locus: resolve => require(['../locus'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.cdetail {
		background: #EEEEEE;
		.csearch-top {
			background: white;
			height: 1rem;
			margin-bottom: .17rem;
		}
		.csearch-inner {
			margin: 0 .34rem;
			display: flex;
			align-items: center;
			height: 100%;
			.csearch-group {
				border: 1px solid #1e81d2;
				color: #1e81d2;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 4.36rem;
				height: .6rem;
				border-radius: .1rem;
				overflow: hidden;
				margin-right: .3rem;
				img {
					width: .35rem;
					margin: 0 .25rem;
				}
				input {
					width: 100%;
					height: 100%;
					border: 0;
					color: #1e81d2;
				}
				input::-webkit-input-placeholder {
					color: #1e81d2;
				}
			}
			.go-search {
				background: #1e81d2;
				color: white;
				width: 1.8rem;
				height: .6rem;
				border-radius: .1rem;
				margin-left: .2rem;
			}
		}
	}
</style>