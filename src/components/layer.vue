<template>
	<div class="modal" :class="actives">
		<span class="seconds" v-show="secendsFlag">还剩<i>{{seconds}}</i>秒</span>
	   <img src="../assets/img/reliezhuhe.jpg" width="100%" height="100%">
	</div>
</template>

<script>
	export default {
		name:'modal',
		data(){
			return{
			   seconds:5,
			   secendsFlag:true
			}
		},
		computed:{
		   flag(){
		   	  return this.$store.state.modalFlag
		   },
		   actives(){
			 if(this.flag&&this.secendsFlag){
//			 	this.$el.addEventListener("animationend",this.ends,false);
				this.ends();
			 	return "show"
			 }else if(this.flag&&!this.secendsFlag){
			 	return "hide"
			 }
			 this.seconds=5,
			 this.secendsFlag=true
			 return ""
		   }
		},
		methods:{
			ends(){
				this.$el.removeEventListener("animationend",this.ends,false);
				let Timers=setInterval(a=>{
					console.log(this.seconds)
					this.seconds-=1;
					if(this.seconds==0){
						clearInterval(Timers);
						this.secendsFlag=false;
					}
				},1000)
			}
		}
	}
</script>

<style lang="less" scoped>
@rem:75rem;
	.modal{
		position: fixed;
		width:100%;
		height:100%;
		top: 0%;
		left: 0%;
		right: 0%;
		bottom: 0%;
		opacity: 0;
		transform: rotateY(0deg) scale(0);	
		box-shadow: 0 0 30/@rem rgba(0,0,0,0.6);
		z-index: 9999;
		animation-fill-mode: both;
		animation-duration: 2s;
		transform-origin: center center 0;
	}
	.modal.show{
		transform: rotateY(0deg) scale(1);
		opacity: 1;	
	}
	.modal.hide{
		transform: rotateY(0deg) scale(0);
		opacity: 0;	
	}
	@keyframes hide{
		0%{
			transform: rotateY(0deg) scale(1);	
			opacity: 1;
		}
		100%{
			transform: rotateY(720deg) scale(0);	
			opacity: 0;
		}
	}
	@keyframes show{
		0%{
			transform: rotateY(0deg) scale(0);	
			opacity: 0;
		}
		100%{
			transform: rotateY(720deg) scale(1);	
			opacity: 1;
		}
	}
	.modal .seconds{
		position: absolute;
		top: 5/@rem;
		right: 5/@rem;
		font-size: 24/@rem;
		color: #fff;
	}
	.modal .seconds i{
		font-style: normal;
		color: #f00;
		margin: 0 10/@rem;
	}
</style>