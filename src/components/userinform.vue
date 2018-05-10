<template>
  <div id="wrapper" class="userinform">
    	<div id="head">
    		<span @click="back"><img src="../../static/back.png"/></span>
    		<div>我的资料</div>
    		<span></span>
    	</div>
    	<div id="main">
    		<div class="user-group">
    			<img src="../../build/logo.png" class="avatar"/>
    		</div>
    		<div class="user-group">
    			<div class="inform-group">
    				<img src="../../static/inform01.png"/>
    				<div class="title">
    					姓名：
    				</div>
    				<input type="text" v-ronly='state' value="董小礼" v-model="phone"/>
    			</div>
    			<div class="inform-group">
    				<img src="../../static/inform03.png"/>
    				<div class="title">
    					性别：
    				</div>
    				<input type="text" v-ronly='state' v-model="sex"/>
    			</div>
    			<div class="inform-group">
    				<img src="../../static/inform02.png"/>
    				<div class="title">
    					身份证：
    				</div>
    				<input type="text" v-ronly='state' v-model="personnum"/>
    			</div>
    			<div class="inform-group">
    				<img src="../../static/inform04.png"/>
    				<div class="title">
    					手机号：
    				</div>
    				<input type="text" readonly="" v-model="phone"/>
    			</div>
    		</div>
    		<div class="inform-group top" @click="editor">
    				{{state}}
    			</div>
    	</div>
  </div>
</template>

<script>
export default {
  name: 'userinform',
  data () {
    return {
      state:'编辑',
      phone:'1721713550',
      sex:'男',
      personnum:'486521648'
    }
  },
  mounted(){
  
  },
  methods:{
		back:function(){
			this.$router.back()
		},
		editor:function(){
			if(this.state=='编辑'){
				this.state='保存'
			}else{
				this.state='编辑'
			}
		}
  },
  directives: {
	  ronly: {
	    // 指令的定义
	    componentUpdated: function (el,binding) {
	      if(binding.arg=='编辑'){
	      	el.setAttribute('readonly','readonly')
	      }else{
	      	el.removeAttribute('readonly')
	      }
	    }
	  }
	}
}
</script>

<style type="text/css" lang="scss">
	.userinform{
		background: #EEEEEE;
		.top{
			justify-content: center;
			color: #FFFFFF;
			font-size: .3rem!important;
			font-weight: 600;
			height: .8rem!important;
			position: absolute;
			bottom: .2rem;
			background: #1e81d2;
			width: calc(100% - .6rem);
			border-radius: .1rem;
		}
		.avatar{
			display: block;width: 1.38rem;
			height: 1.38rem;
			border-radius: 50%;
			margin: .3rem auto;
		}
		.user-group{
			background: white;
			margin-bottom: .3rem;
			overflow: hidden;
		}
		.inform-group{
			margin:0 .34rem;
			border-bottom: 1px solid #EEEEEE;
			height: 1rem;
			display: flex;align-items: center;
			font-size: .25rem;
			.title{
				width: 1.6rem;
				font-weight: 600;
			}
			img{
				height: .35rem;
				margin-right: .25rem;
			}
			input{
				border: 0;
				flex: 1;
			}
		}
	}
</style>
