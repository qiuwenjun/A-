<template>
	<div id="userInfo">
		<header class="header">
			<h2>
				<img src="../assets/img/default.png" width="100%" height="100%">
			</h2>
			<span>{{getUserInfo.nickname}}</span>
			<!--<time>时间截止:{{getUserInfo.valid_time==0?'无限期':getUserInfo.valid_time}}</time>-->
		</header>
		<section class="main">
			<article class="main_content">
				<div class="termsOf">
					<a href="tel:02180282777">
						<i class="iconfont icon-dianhua"></i>
						<h2>联系客服</h2>
						<span>></span>
					</a>
				</div>
				<div class="termsOf">
					<router-link to="/hgx">
						<i class="iconfont icon-hangye"></i>
						<h2>合规性介绍</h2>
						<span>></span>
					</router-link>
					
				</div>
				<div class="termsOf">
					<router-link to="/book">
						<i class="iconfont icon-wenjian"></i>
						<h2>风险评估表</h2>
						<span>></span>
					</router-link>
				</div>
			</article>
		</section>		
	</div>
</template>

<script>
	export default {
		name:'User',
		data(){
			return{
				userInfo:{}
			}
		},
		created(){
			this.$store.dispatch("getuserinfo").then(success=>{
				if(success.data.status==0){
					this.userInfo=success.data.data;
				}else{
					this.$store.commit("submitPrompt",{
						flag:true,
						text:success.data.error,
						status:1
					});
				}
			},error=>{
				console.log(error)
			})
		},
		computed:{
			getUserInfo(){
				return this.userInfo
			}
		}
	}
</script>

<style scoped>
#userInfo{
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: #fff;
    padding-bottom: 1.7rem;	
}
.header{
	background:url(../assets/img/Sound_waves.png) repeat-x center center,#ee5655;
	background-size: 0.8rem 0.24rem;	
	height: 4.8rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top:1.2rem;
}
.header h2{
	width: 2.5rem;
	height: 2.5rem;
	padding: 0.2rem;
	background:#ee5655;
	overflow: hidden;
	border-radius: 50%;
	overflow: hidden;
}
.header span,.header time{
	font-size: 0.4rem;
	color: #fff;
	margin-bottom: 0.2rem;
}
.header img{
	border-radius: 50%;
}
.main .termsOf{
	padding:0.46rem 0.3rem 0.41rem 0.55rem;
	font-size: 0.43rem;
	border-bottom: 0.03rem solid #eee;
}
.main .termsOf a{
	display: flex;
	align-items: center;
}
.main .termsOf i{
	color: #858585;
	font-size: 0.46rem;
	margin-right: 0.49rem;
}
.main .termsOf:first-child i{
	color: #fff;
	background: #858585;
	border-radius: 50%;
	overflow: hidden;
	text-align: center;
	line-height:0.48rem;
	display: block;
	width: 0.48rem;
	height: 0.48rem;
	font-size: 0.24rem;
}
.main .termsOf i:before{
	display: block;
}
.main .termsOf h2{
	color: #000;
	font-size: 0.4rem;
	width: 7.9rem;
}
.main .termsOf span{
	color: #858585;
	font-size: 0.5rem;
	
}
</style>