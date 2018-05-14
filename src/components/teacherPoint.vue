<template>
		<section class="main" @scroll="scroll">
			<div class="main-content">
				<div class="noData" v-if="this.flag">
					<img src="../assets/img/nodata.png">
					<p>暂未添加数据！！！</p>
				</div>
				<div v-else class="theme" :class="name=='getTeacher'?'getTeacher':'getIndustry'" v-for="item,index in getData">
					<router-link :to="{name:'article',params:{id:item.id,name:arr,request:name}}">
							<p v-text="item.title"></p>
							<time>日期:<span v-text="item.cdate"></span></time>	
					</router-link>
				</div>
			</div>
			<p :style="{display:text?'block':'none'}" v-text="text"></p>
		</section>
</template>

<script>
	export default {
		name:"teacherPoint",
		props:['name','arr'],
		data(){
			return {
				isRequest:true
			}
		},
		computed:{
			getData(){
				return this.$store.state[this.arr].data
			},
			text(){
				return this.$store.state[this.arr].text
			},
			flag(){
				return this.$store.state[this.arr].flag
			}
		},
		mounted(){
			this.theme=this.$el.children[0];
			if(!this.$store.state[this.arr].flag){
				this.setHeight()
			}
		},
		methods:{
			scroll(){
				if(this.$store.state[this.arr].text){
					this.theme.style.height=""
					return
				}
				var iClient=document.body.clientHeight||document.documentElement.clientHeight;
				var iTop=this.$el.scrollTop;
				this.setHeight();
				var maxScrollTop=Math.abs(this.theme.offsetHeight-iClient)-20;
				if(this.isRequest&&iTop>=maxScrollTop){
					this.isRequest=false;
					this.$store.dispatch(this.name,this.$store.state[this.arr].page).then((success)=>{
		  				this.isRequest=true;
				 	    if(success.data.status==0){
				 	     	this.$store.commit("setDatas",{
				 	     		name:this.arr,
				 	     		data:success.data.data
				 	     	})
				 	    }else{
				 	     	this.commit("submitPrompt",{
								flag:true,
								text:success.data.error,
								status:1
							});
				 	    }
				 	},(error)=>{
				 	  	 console.log(error)
				 	});		
				}
			},
			setHeight(){
				var iClient=document.body.clientHeight||document.documentElement.clientHeight;
				this.$el.style.height=iClient+'px';
				this.theme.style.height="";
				var iMain=this.theme.offsetHeight;
				if(iMain<iClient){
					this.theme.style.height=iClient+20+'px';
				}
			}
		},
	}
</script>

<style scoped>
	    .main {
	    	overflow: auto;
    		padding: 0  0.35rem;
    	}
    	.main .theme{
    		width:100%;
    		height: 2.7rem;
    		margin:0.26rem 0;
    		border-radius:10px;
    		overflow: hidden;
    		background-repeat: no-repeat;
    		background-position: center center;
    		background-size: 100% 100%;
    	}
    	.getTeacher{
    		background-image: url(../assets/img/sd_03.png);
    	}
    	.getIndustry{
    		background-image: url(../assets/img/ss.jpg);
    	}
    	.main .theme a{
    	 	display: block;
    	 	background: rgba(0,0,0,0.4);
    	 	height: 100%;
    	 	text-align: center;
    	 	display: flex;
    	 	flex-direction: column;
    	 	justify-content: center;
    	 	color: #fff;
    	}
    	.main .theme a p{
    		font-size: 0.38rem;
    		margin-bottom: 0.2rem;
    	}
    	.main .theme a time{
    		font-size: 0.2rem;
    	}
    	.main>p{
			color: #f00;
			text-align: center;
			font-size: 0.2rem;
		}
</style>