<template>
  <div id="wrapper" class="tindex">
    	<t-head></t-head>
    	<div id="main">
    		<div class="tindex-top">
    			<div class="img-box">
    				<img src="../../../static/creame.png" class="gocream"/>
    				<img :src="creamsrc" class="creamok" v-show="creamsrc!=''"/>
    			</div>
    			<div class="tindex-setting">
    				<div class="setting-group">
    					<img src="../../../static/reset.png"/>
    					<span>
    						 取消
    					</span>
    				</div>
    				<div class="setting-group">
    					<img src="../../../static/upload.png"/>
    					<span>
    						 上传
    					</span>
    				</div>
    			</div>
    		</div>
    		<div class="tindex-bottom">
    			<div class="bottom-title">
    				<img src="../../../static/prompt.png"/>
    				<span>
    					温馨提示
    				</span>
    			</div>
    			<div class="bottom-group">
    				<span>
    					1、
    				</span>
    				<span>
    					您可以游客身份，点击摄像按钮对发现问题进行拍摄；
    				</span>
    			</div>
    			<div class="bottom-group">
    				<span>
    					2、
    				</span>
    				<span>
    					请打开手机定位功能，以方便问题案卷派送给所属网格员处理；
    				</span>
    			</div>
    			<div class="bottom-group">
    				<span>
    					3、
    				</span>
    				<span>
    					您注册并登陆，我们会将整改后案卷反馈给您；
    				</span>
    			</div>
    			<div class="bottom-group">
    				<span>
    					4、
    				</span>
    				<span>
    					美好家园共同维护，我们鼓励您协助整改，登录后可将整改后照片上传，我们将对您的文明行为进行记录。
    				</span>
    			</div>
    		</div>
    	</div>
    	<t-foot></t-foot>
  </div>
</template>

<script>
export default {
  name: 'tindex',
  data () {
    return {
      creamsrc:''
    }
  },
  components:{
  	THead:resolve => require(['../tourists/thead'],resolve),
  	TFoot:resolve => require(['./afoot'],resolve)
  },
  mounted(){
  	this.$store.state.tfoot=3
  }
}
</script>

<style lang="scss">
	.tindex{
		.tindex-top{
			height: 6.2rem;
			width: 100%;
			background: url(../../../static/tindex.png) repeat-x;
			background-size: 100% 100%;
			overflow: hidden;
			.img-box{
				height: 2.9rem;
				display: flex;
				justify-content: center;
				align-items: center;
				margin:.7rem auto 1.2rem;
				.gocream{
					height: 1rem;
				}
				.creamok{
					height: 2.9rem;
					box-shadow: 0 0 2px 4px #1c77c8;
				}
			}
			.tindex-setting{
				display: flex;
				font-size: .25rem;
				color: white;
				justify-content: space-between;
				margin: 0 1.6rem;
				.setting-group{
					display: flex;
					align-items: center;
				}
				img{
					height: .4rem;
					margin-right: .12rem;
				}
			}
		}
		.tindex-bottom{
			margin: .35rem .35rem 0;
			.bottom-title{
				display: flex;
				align-items: center;
				justify-content: center;
				color: #828282;
				font-size: .3rem;
				font-weight: 600;
				margin-bottom:.4rem;
				img{
					height: .45rem;
					margin-right: .1rem;
				}
			}
			.bottom-group{
				display: flex;
				margin: .2rem 0;
				color: #828282;
				line-height: .35rem;
				span:first-of-type{
					width: .4rem;
				}
			}
		}
	}
</style>
