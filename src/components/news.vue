<template>
	<article class="news_article" :class="{active:flag}" @scroll="scroll">
		<div class="noData" v-if="this.flags">
			<img src="../assets/img/nodata.png">
			<p>暂未添加数据！！！</p>
		</div>
		<ul v-else>
			<li v-for="item,index in newsArr" @click="change(item)">
				<div class="news_information clearfix">
						<div class="news_introduce">
							<p v-text="ellipses(item.title,item)"></p>
							<time v-text="item.cdate"></time>
						</div>
						<div class="news_thumbnail">
							<img :src="item.title_pic">
						</div>			
				</div>
			</li>
		</ul>
		<p :style="{display:text?'block':'none'}" v-text="text"></p>
	</article>
</template>

<script>
export default {
		name:"news",
		props:{
			data:{
				type:Boolean,
				default:false
			},
			flag:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return {
				isRequest:true,
			}
		},
		computed:{
			newsArr(){
				if(this.data){  //为true说明是首页请求
					return this.$store.state.newsArr.data.filter((item,index)=>index<5)
				}else{
					return this.$store.state.newsArr.data
				}
			},
			text(){
				return this.$store.state.newsArr.text
			},
			flags(){
				if(this.$store.state.newsArr.flag){
					this.isRequest=false;
				}
				return this.$store.state.newsArr.flag
			}
		},
		methods:{
			ellipses(title,item){
				if(title.length>30){
					return title.substr(0,30)+"...";
				}else{
					return title
				}
			},
			scroll(){
		  		var el=this.iUl;				
				if(!this.flag) return
				if(this.$store.state.newsArr.text){
					el.children[0].style.height=""
					return
				}
		  		var iChild=el.children[0];
		  		var iTop=el.scrollTop;
		  		this.setHeight();
		  		var maxPullUp=Math.abs(el.offsetHeight-iChild.offsetHeight)-20;
		  		console.log(this.isRequest,iTop,maxPullUp)
		  		if(this.isRequest&&iTop>=maxPullUp){   //开始请求
		  			this.isRequest=false;
		  			this.$store.dispatch("getNews",this.$store.state.newsArr.page).then((success)=>{
		  				this.isRequest=true;
				 	    if(success.data.status==0){
				 	     	this.$store.commit("setDatas",{
				 	     		name:'newsArr',
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
		    	var el=this.iUl;
		    	var iHeight=document.body.clientHeight||document.documentElement.clientHeight;
		    	el.style.height=""
		    	var elHeight=el.offsetHeight;
		    	if(elHeight<iHeight){
		    		el.style.height=iHeight+20+'px'
		    	}
		    },
		    change(obj){
		    	this.$router.push({
		    		name:'article',
		    		params:{
		    			id:obj.id,
		    			name:'newsArr'
		    		}
		    	})
		    }
		},
		mounted(){
			this.iUl=this.$el;
			if(!this.data&&!this.flags){
				this.setHeight()
			}	
		}
	}
</script>
<style scoped>
.news_article.active{
	overflow: auto;
	bottom: 0;
	left: 0%;
	right: 0%;
	position: absolute;
	top: 0;
	background: #fff;
}
.news_article ul li {
  padding: 0 0.53333333rem;
  height: 2.37333333rem;
  border-bottom: 0.02666667rem solid #eee;
  background: #fff;
}
.news_article ul li .news_information {
  height: 1.74666667rem;
  padding: 0.32rem 0 0.30666667rem 0;
}
.news_article ul li .news_introduce {
  float: left;
  width: 6rem;
  height: 1.41333333rem;
  padding: 0.14666667rem 0 0.21333333rem;
}
.news_article ul li .news_introduce time {
  font-size: 0.24rem;
  color: #858585;
  margin-top: 0.13333333rem;
  display: block;
}
.news_article ul li .news_introduce p {
  font-size: 0.34666667rem;
  height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
}
.news_article ul li .news_thumbnail {
  float: right;
  width: 2.72rem;
  height: 100%;
}
.news_article ul li .news_thumbnail img {
  height: 100%;
}
.news_article>p{
	color: #f00;
	text-align: center;
	font-size: 0.2rem;
}
</style>