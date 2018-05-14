<template>
	<nav id="menu">
		<ul>
			<li :class="{active:flag}">
				<router-link :to="{name:'main'}">
					<i class="iconfont icon-weibiaoti1"></i>
					<span>首页</span>
				</router-link>
			</li>
			<li :class="{active:!flag}">
				<router-link :to="{name:'User'}">
					<i class="iconfont icon-icon"></i>
					<span>个人中心</span>
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		name:"menus",
		data(){
			var flag=this.$route.path=='/User'?false:true;
			return{
				flag
			}
		},
		watch:{
			$route(){
				this.flag=this.$route.path=='/User'?false:true;
			}
		},
	}
</script>

<style lang="less" scoped>
  @rem:75rem;
  #menu{
  	width: 100%;
 	padding: 10/@rem 0;
 	background:#F7F7FA;
 	box-shadow: 5/@rem 0 8/@rem rgba(0,0,0,0.4); 	
 	position: fixed;
 	bottom: 0;
 	ul{
 		display: flex;
 		li{
 			&.active{
 				a{
	 				color: #ee5655;
	 			}
 			}
 			flex: 1;
 			font-size: 30/@rem;
 			text-align: center;
 			a{
 				color: #858585;
 				display: inline-block;
 				i{
 					display: block;
	 				font-style: normal;
	 				font-size:50/@rem;
	 			}	
 			}
 		}
 	}
  }
</style>