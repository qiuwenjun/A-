<template>
	<div id="today" @scroll="scroll">
		<div class="today_content">
			<div class="noData" v-if="this.flag">
				<img src="../../assets/img/nodata.png">
				<p>暂未添加数据！！！</p>
			</div>
		   <div class="the_data" v-else v-for="item,index in data">
		      <header>
		      	 <h2 v-text="item.stock_name"></h2>
		      	 <time v-text="item.send_time"></time>
		      </header>
		      <div class="table"></div>
		      <section class="main">
		      	<div>
		      		<p>最新调仓{{item.create_time}}</p>
		      	</div>
		      	<div class="">
		      		<div class="main_left">
		      	  	    <h3 :style="{color:item.total_revenue>0?'#f05b5a':'#f7cd4e'}">{{Number(item.total_revenue).toFixed(2)}}<span>%</span></h3>
		      	  	    <p>总收益</p>
			      	</div>
			      	<div class="main_right">
			      	  	<h3 :style="{color:item.stock_expected>0?'#f05b5a':'#f7cd4e'}">{{Number(item.stock_expected).toFixed(2)}}<span>%</span></h3>
			      	  	<p>预期增长</p>
			      	</div>
			    </div>
			    <div>
			    	<p>{{item.stock_title}}</p>
			    </div>
		      </section>
		      <div class="footer"></div>
		      <footer>
		      	  <router-link :to="{name:'Stock_details',params:{name:'todayArr',id:item.id}}">查看详情</router-link>
		      </footer>
		   </div>
		</div>
		<p :style="{display:text?'block':'none'}" v-text="text"></p>
	</div>
</template>

<script>
	export default {
		name:"today",
		props:["index"],
		data(){
			return{
				isRequest:true,
			}
		},
		computed:{
			text(){
				return this.$store.state.todayArr.text
			},
			data(){
				return this.$store.state.todayArr.data
			},
			flag(){
				return this.$store.state.todayArr.flag
			}
		},
		mounted(){
			this.main=this.$el.children[0];
		},
		watch:{
			data(){
				if(!this.$store.state.todayArr.flag){
					this.setHeight();				
				}	
			}
		},
		methods:{
			scroll(){
				if(this.$store.state.todayArr.text){
					this.main.style.height="";
					return 
				}
				var iClient=this.$el.offsetHeight;
				var iTop=this.$el.scrollTop;
				this.setHeight();
				var maxScrollTop=Math.abs(this.main.offsetHeight-iClient)-20;
				if(this.isRequest&&iTop>=maxScrollTop){
					this.isRequest=false;
					this.$store.dispatch("getStocks",{
						link:0,
						page:this.$store.state.todayArr.page
					}).then((success)=>{
		  				this.isRequest=true;
				 	    if(success.data.status==0){
				 	     	this.$store.commit("setDatas",{
				 	     		name:"todayArr",
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
				var mHeight=this.$el.offsetHeight;
				this.main.style.height="";
				var cHeight=this.main.offsetHeight;
				if(cHeight<mHeight){
					this.main.style.height=mHeight+20+'px';
				}
			}
		}
	}
</script>

<style>
	#today>p{
		color: #f00;
		text-align: center;
		font-size: 0.2rem;
	}
</style>