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
		<div id="head">
			<span @click="back">
					<img src="../../static/back.png"/>
				</span>
			<div>美丽南钢</div>
			<span></span>
		</div>
		<div id="main" style="height: calc(100% - .7rem);">
			<div>
				<div class="box-group">
					<div class="group" @click="opennew('hworkdetail',val.cworkId)" v-for="val in mydata">
						<div class="riqi">
							<div class="circle width12"></div>
							<span>{{val.createTime1}}</span>
						</div>
						<span class="text">{{val.cworkTitle}}</span>
						<img src="../../static/shanchu.png" @click.stop="workphotod(val.cworkId)" />
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
	export default {
		name: 'hwork',
		data() {
			return {
				uploadtarget: '',
				server: 'http://39.107.70.18/Transportation/uploadDriverImage',
				files: [],
				alertboo: false,
				mydata: []
			}
		},
		mounted() {
			this.$store.state.tfoot = 2
			this.myajax()
		},
		methods: {
			workphotod: function() {
				var that = this
				var btnArray = [{
					title: "删除"
				}, ]; //选择按钮  1 2 3
				plus.nativeUI.actionSheet({
					title: "请选择",
					cancel: "取消",
					buttons: btnArray
				}, function(e) {
					var index = e.index;
					switch(index) {
						case 1:
							$.ajax({
								type: "post",
								url: that.service + "/deleteCorkByCworkId",
								dataType: 'json',
								data: {
									cworkId: id
								},
								success: function(res) {
									if(res.status == 200) {
										function plusReady() {
											// 显示自动消失的提示消息
											plus.nativeUI.toast("删除完成！");
											that.myajax()
										}
										if(window.plus) {
											plusReady();
										} else {
											document.addEventListener("plusready", plusReady, false);
										}
									} else {
										function plusReady() {
											// 显示自动消失的提示消息
											plus.nativeUI.toast("删除失败!");
										}
										if(window.plus) {
											plusReady();
										} else {
											document.addEventListener("plusready", plusReady, false);
										}

									}
								}
							});
							break;
					}
				});
			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "get",
					url: that.service + "/querAllCwork",
					dataType: 'json',
					data: {
						cuserId: localStorage.getItem('userid')
					},
					success: function(res) {
						that.mydata = res.data
					}
				});
			},
			back: function() {
				this.$router.back()
			},
			alerttab: function() {
				this.alertboo = !this.alertboo
			},
			opennew: function(target, id) {
				this.$store.state.windexid = id
				this.$router.push({
					name: target
				})
			},
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			},
			service() {
				return this.$store.state.service
			}
		},
		components: {

		}
	}
</script>

<style type="text/css" lang="scss">
	html,
	body,
	.warpper {
		padding: 0px;
		margin: 0px;
		font-size: .2rem;
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>