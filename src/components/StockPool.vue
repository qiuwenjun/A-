<template>
	<div class="stockPool" @scroll="scroll">
		<header class="header"></header>
		<section class="main">
			<div class="noData" v-if="this.flag">
				<img src="../assets/img/nodata.png">
				<p>暂未添加数据！！！</p>
			</div>
			<article class="news" v-else>
				<dl>
					<dt>
						<h2>股票名称&nbsp;|&nbsp;股票代码</h2>
						<h2>推荐日期</h2>
					</dt>
					<dd v-for="item,index in stockArr">
						<router-link :to="{name:'details',params:{id:item.id,name:'StockArr'}}" tag="div">
							<div>
								<span v-text="item.stock_name"></span>
								<span v-text="item.stock_number"></span>
							</div>
							<time v-text="item.send_time"></time>
						</router-link>		
					</dd>
				</dl>
			</article>
		</section>		
		<p :style="{display:text?'block':'none'}" v-text="text"></p>
	</div>
</template>

<script>
	export default {
		name:"StockPool",
		data(){
			return {
				isRequest:true,
			}
		},
		computed:{
			stockArr(){
				return this.$store.state.StockArr.data
			},
			text(){
				return this.$store.state.StockArr.text
			},
			flag(){
				return this.$store.state.StockArr.flag
			}
		},
		mounted(){
			this.header=this.$el.children[0];
			this.main=this.$el.children[1];
			if(!this.$store.state.StockArr.flag){
				this.setHeight()
			}
		},
		methods:{
			scroll(){
				if(this.$store.state.StockArr.text){
					this.main.style.height=""
					return
				}
				var iClient=document.body.clientHeight||document.documentElement.clientHeight;
				var iTop=this.$el.scrollTop;
				this.setHeight();
				var maxScrollTop=Math.abs(this.main.offsetHeight+this.header.offsetHeight-iClient)-20;
				if(this.isRequest&&iTop>=maxScrollTop){
					this.isRequest=false;
					this.$store.dispatch("getStock",this.$store.state.StockArr.page).then((success)=>{
		  				this.isRequest=true;
				 	    if(success.data.status==0){
				 	     	this.$store.commit("setDatas",{
				 	     		name:'StockArr',
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
				this.main.style.height="";
				var iMain=this.main.offsetHeight;
				var iHeader=this.header.offsetHeight;
				if((iMain+iHeader)<iClient){
					this.main.style.height=iClient-iHeader+20+'px';
				}
			}
		},
	}
</script>

<style scoped>
	
	    .stockPool{
	    	overflow: auto;
	    }
	    .stockPool .header {
		  width: 100%;
		  height: 5.33333333rem;
		  background: url(../assets/img/banner.jpg) no-repeat center center;
		  background-size: 100% 100%;
		}
		.stockPool .main {
		  background: #eee;
		}
		.stockPool .main .news {
		  background: #fff;
		  padding-left: 0.56rem;
		  width: 9.44rem;
		}
		.stockPool .main .news dl dd>div,
		.stockPool .main .news dl dt {
		  display: flex;
		  border-bottom: 0.02666667rem solid #eee;
		}
		.stockPool .main .news dl dt {
		  height: 0.96rem;
		  line-height: 0.96rem;
		}
		.stockPool .main .news dl dt h2 {
		  width: 4.73333333rem;
		  color: #858585;
		  font-size: 0.37333333rem;
		}
		.stockPool .main .news dl dd>div {
		  padding: 0.29333333rem 0 0.33333333rem;
		  height: 0.97333333rem;
		}
		.stockPool .main .news dl dd>div>div {
		  width: 4.73333333rem;
		}
		.stockPool .main .news dl dd>div>div span:first-child {
		  color: #525156;
		  font-size: 0.4rem;
		  margin-bottom: 0.06666667rem;
		  display: block;
		}
		.stockPool .main .news dl dd>div>div span:last-child {
		  font-size: 0.29333333rem;
		  color: #858585;
		  display: block;
		}
		.stockPool .main .news dl dd>div time {
		  font-size: 0.4rem;
		  color: #525156;
		  line-height: 0.97333333rem;
		}
		.stockPool .main .news dl dd>div>span {
		  font-size: 0.4rem;
		  color: #858585;
		  line-height: 0.97333333rem;
		}
		.stockPool p{
			color: #f00;
			text-align: center;
			font-size: 0.2rem;
		}
</style>