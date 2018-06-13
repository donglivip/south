<template>
  <div id="wrapper" class="cbackdetail">
    	<div id="head">
    		<span @click="back">
    			<img src="../../static/back.png"/>
    		</span> 
    		<div>退回案卷详情</div> 
    		<span></span>
    	</div>
    	<div id="main" style="height: calc(100% - .8rem);">
    		<div class="detail-group">
    			<div class="detail-inner">
    				<img src="../../static/detail=adress.png"/>
    				<div class="detail-text">
    					{{mydata[0].cgridName}}
    				</div>
    			</div>
    		</div>
    		<div class="detail-group">
    			<div class="detail-inner">
    				<img src="../../static/detail-time.png"/>
    				<div class="detail-text">
    					上报时间：{{mydata[0].createTime1}}
    				</div>
    			</div>
    			<div class="detail-inner">
    				<img src="../../static/detail-up.png"/>
    				<div class="detail-text">
    					上报人：{{mydata[0].cuserName}}
    				</div>
    			</div>
    			<div class="detail-inner">
    				<img src="../../static/up-back.png"/>
    				<div class="detail-text">
    					退回人：{{mydata[1].cuserName}}
    				</div>
    			</div>
    			<div class="detail-inner">
    				<img :src="mydata[0].cfileDealPrevImg1 | myimg" class="big-img"/>
    			</div>
    		</div>
    		<div class="godubmit" @click="mysubmit">
    			确认分配
    		</div>
    	</div>
    	<transition name='nav'>
				<bootom-nav v-show='navboo' v-on:navshow='navshow'></bootom-nav>
			</transition>
  </div>
</template>

<script>
export default {
  name: 'cbackdetail',
  data () {
    return {
      navboo:false,
      mydata:[]
    }
  },
  mounted(){
  	this.$store.state.tfoot=4
  	this.myajax()
  },
  methods:{
  	mysubmit:function(){
  		var that=this
  		$.ajax({
					type: "post",
					url: that.service + "/updateByPrimarykeyAndConfirmingAssignments",
					dataType: 'json',
					data: {
						cfileId: that.windexid,
						cuserIdNetwork:localStorage.getItem('userid'),
						cgridId:that.mydata[0].cgridId,
						cfileResult:0
					},
					success: function(res) {
						console.log(res)
						that.$router.back()
					}
				});
  	},
  	myajax:function(){
				var that=this
				$.ajax({
					type: "get",
					url: that.service + "/queryReturnFileById",
					dataType: 'json',
					data: {
						cfileId: that.windexid
					},
					success: function(res) {
						that.mydata=res.data
					}
				});
			},
		opennew:function(target){
			this.$router.push({
				name:target
			})
		},
		back:function(){
			this.$router.back()
		},
		navshow:function(id){
				this.navboo=!this.navboo
				this.navtext=id
			},
  },
  components:{
  	BootomNav: resolve => require(['./bottom-nav'], resolve)
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
	.cbackdetail{
		background: #EEEEEE;
		.godubmit{
			background: #1e81d2;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: .1rem;
			margin: .6rem .34rem .3rem;
			height: .9rem;
		}
		.arrimg{
			margin-left: .15rem;
		}
		.detail-group{
			background: white;
			margin-bottom: .22rem;
			border-bottom: 1px solid #d4d3d4;
			.detail-inner{
				margin: 0 .34rem;
				display: flex;
				align-items: center;
				padding: .3rem 0;
				border-bottom: 1px solid #d4d3d4;
				&:last-of-type{
					border: 0;
				}
				img{
					height: .25rem;
					margin-right: .25rem;
				}
				.big-img{
					width: 3.8rem;
					height: 2.6rem;
					display: block;
					margin: .25rem auto;
				}
				.detail-text{
					flex: 1;
				}
			}
		}
	}
</style>
