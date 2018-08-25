<template>
  <div class="showimages" @click="imgclick">
    	<img :src="mimg"/>
  </div>
</template>

<script>
export default {
  name: 'showimages',
  data () {
    return {
      
    }
  },
  mounted(){
  	
  },
  methods:{
		imgclick:function(){
			this.$emit('imgclick')
		}
  },
  computed:{
  	mimg() {
				return this.$store.state.mimg
			}
  }
}
</script>

<style type="text/css" lang="scss">
	.showimages{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.9);
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
	}
	.showimages img{
		max-width: 100%;
		max-height: 100%;
	}
</style>
