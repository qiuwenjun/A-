<template>
	<div id="live">
		<header class="header">
			<img src="../assets/img/bg.jpg">
			<div class="theFont">
				<div class="theFont_left theFont-conetnt">
					<div class="describe"><h2>字体大小</h2></div>
					<div class="refresh" :class="{active:auto.fontLeft}" @click="add('fontLeft')">
						<div class="uncheck">
							<span><img src="../assets/img/ziti_jian.png"></span>
							<span><img src="../assets/img/ziti_jia.png"></span>							
						</div>
						<div class="selected">
							<div>
								<span><img src="../assets/img/ziti_active_jian.png"></span>	
								<span><img src="../assets/img/ziti_active_jia.png"></span>								
							</div>
						</div>
					</div>
				</div>
				<span></span>
				<div class="theFont_right">
					<div class="describe">
						<h2>自动更新</h2>
						<span>上次刷新时间 10:00</span>
					</div>
					<div class="refresh" :class="{active:auto.fontRight}" @click="add('fontRight');request()">
						<div class="auto"><span><img src="../assets/img/auto.png"></span></div>
					</div>
				</div>
			</div>
		</header>
		<section class="main" @scroll="scroll">
			<div class="noData" v-if="this.flag">
				<img src="../assets/img/nodata.png">
				<p>暂未添加数据！！！</p>
			</div>
			<div class="main-content" v-else>
				<aside class="list Placed" v-for="item,index in stickyData" :class="{active:auto.fontLeft}">
					<div class="list_title">
					  <h3 v-text="item.name"></h3>
					  <time v-text="item.cdate"></time>
					  <span v-text="item.lable"></span>
					</div>
					<div class="list_main">
					  <span class="iconfont icon-11_zhiding">置顶</span>  
					  {{item.content}}
					</div>
				</aside>
				<aside class="list" v-for="item,index in CommonData"  :class="{active:auto.fontLeft}">
					<div class="list_title">
					  <h3 v-text="item.name"></h3>
					  <time v-text="item.cdate"></time>
					  <span v-text="item.lable"></span>
					</div>
					<div class="list_main">
					  {{item.content}}
					</div>
				</aside>
				<p :style="{display:text?'block':'none'}" v-text="text"></p>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name:"live",
		data(){
			return {
				auto:{
					fontLeft:false,
					fontRight:false
				},
				isRequest:true
			}
		},
		computed:{
			CommonData(){    //普通数据
				return this.$store.state.LiverArr.data.filter((item,index)=>item.type==0)
			},
			stickyData(){    //置顶数据
				return this.$store.state.LiverArr.data.filter((item,index)=>item.type==1)
			},
			text(){
				return this.$store.state.LiverArr.text
			},
			flag(){
				return this.$store.state.LiverArr.flag
			}
		},
		created(){
			if(this.auto.fontRight) this.request()
		},
		methods:{
			add(flag){
				this.auto[flag]=!this.auto[flag]
			},
			request(){
				if(this.auto.fontRight){  //开启自动刷新
					this.Timers=setInterval(()=>{
						console.log(1)
					 	this.$store.dispatch("getLive",this.$store.state.LiverArr.page-1).then((success)=>{
					 	     if(success.data.status==0){
					 	     	  this.$store.commit("setDatas",{
					 	     	  	name:"LiverArr",
					 	     	  	data:success.data.data
					 	     	  })
					 	     }else{
					 	     	 router.replace({path:'/'})
					 	     }
					 	  },(error)=>{
					 	  	 console.log(error)
					 	  });		 
					},1000);
				}else{
					clearInterval(this.Timers)
				}
			},
			setHeight(){
				var iHeight=document.body.clientHeight||document.documentElement.clientHeight;
				var marginHeight=parseInt(getComputedStyle(this.iMain)["marginTop"]);
				var minH=iHeight-this.iHeader.offsetHeight-marginHeight;
				this.iMain.style.height=minH+'px';
				this.iMainCon.style.height="";
				var mainConH=this.iMainCon.offsetHeight;				
				if(mainConH<minH){
					this.iMainCon.style.height=minH+20+'px';
				}
			},
			scroll(){
				if(this.$store.state.LiverArr.text){
					this.iMainCon.style.height="";
					return
				}
				var el=this.iMain;
				var iChild=el.children[0];
		  		var iTop=el.scrollTop;
		  		this.setHeight();
		  		var maxPullUp=Math.abs(el.offsetHeight-iChild.offsetHeight)-20;
		  		if(this.isRequest&&iTop>=maxPullUp){   //开始请求
		  			this.isRequest=false;
		  			this.$store.dispatch("getLive",this.$store.state.LiverArr.page).then((success)=>{
		  				this.isRequest=true;
				 	    if(success.data.status==0){
				 	     	this.$store.commit("setDatas",{
				 	     		name:'LiverArr',
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
			}
		},
		mounted(){
			this.iHeader=this.$el.children[0];
			this.iMain=this.$el.children[1];
			this.iMainCon=this.iMain.children[0];
			if(!this.$store.state.LiverArr.flag){
				this.setHeight();	
			}

		}
	}
</script>

<style scoped lang='less'>
@rem:75rem;
#live .header{
	position: relative;
	height: 300/@rem;
	.theFont{
		position: absolute;
		bottom: 0rem;
		width: 8.82rem;
		height: 1.24rem;
		left: 50%;
		margin: 0 0 -0.8rem -4.6rem;
		background: #fff;
		border-radius: 0.2rem;
		overflow: hidden;
		display: flex;
		padding: 0.16rem 0.24rem 0.2rem;
		>div{
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		>div{
			.describe{
			   h2{
			   	color: #3c3c3c;
			   	font-size: 24/@rem;
			   }	
			   span{
			   	color: #858585;
			   	display: block;
			   	font-size: 16/@rem;
			   }
			}
			.refresh{
				float: right;
				margin-right: 0.21rem;
				width: 1.6rem;
				height: 0.8rem;
				background: #eee;
				border-radius: 0.5rem;
				color: #858585;
				position: relative;
				border: 2px solid #ccc;
				cursor: pointer;
				overflow: hidden;
				box-sizing: border-box;
				span{
					display: inline-block;
					width: 0.8rem;
					height: 100%;
					padding: 0.2rem;
					box-sizing: border-box;	
				}
				.uncheck{
					display: flex;
					height: 100%;	
				}
				.selected{
					top: 0%;
					position: absolute;
					width: 0.8rem;
					height: 100%;
					left: 0%;
					transition: left 0.6s;
					overflow: hidden;
					border-radius: 50%;
					background: #fff;
					transition: left 0.6s;
					>div{
						width: 1.6rem;
						height: 100%;
						position: absolute;
						transition: left 0.6s;
						left: 0%;
						top: 0%;
						display: flex;
						span{
							color: #000;
						}
					}
				}
				.auto{
					position: absolute;
					width: 0.8rem;
					height: 100%;
					transition:all 0.6s;
					border-radius:10rem;
					span{
						width: 0.75rem;
						background: #fff;
						border-radius: 50%;
						position: absolute;
						right: 0;
						top: 0;
						transition:transform 0.6s;
					}
				}
			}
			.refresh.active{
				.selected{
					left: 50%;
					>div{
						left: -100%;
					}
				}
				.auto{
					background: #ee5958;
					width: 100%;
					span{
						transform: rotateZ(180deg);
					}
				}
			}
		}
	}

}
#live .main{
	margin-top: 80/@rem;
	overflow: auto;
	p{
	 color: #f00;
	 text-align: center;
	 font-size: 0.2rem;
	}
	.list{
		&.Placed{
			.list_main{
				color: #f00;
				span{
					top: -6/@rem;
					color: #fff;
					text-align: center;
					border-radius: 10/@rem;
					background: #f00;
					position: relative;
					padding: 8/@rem;
					font-size: 20/@rem;
					text-indent: 3em;
				}
			}
		}
		&.active{
			.list_title{
				h3{
					font-size: 30/@rem;
				}
				time{
					font-size: 24/@rem;
				}
				span{
					font-size: 24/@rem;
				}
			}
			.list_main{
				font-size: 38/@rem;
			}
		}
		padding: 22/@rem 40/@rem;
		background: #fff;
		margin-bottom:10/@rem;
		.list_title{
			display: flex;
			h3{
				max-width: 150/@rem;
				text-overflow: ellipsis;
				white-space:nowrap; 
				overflow: hidden;
				font-size: 26/@rem;
				color: #525156;
			}
			time{
				padding: 6/@rem 8/@rem;
				color: #fff;
				font-size: 20/@rem;
				background: #7ecef4;
				margin: 0 10/@rem;
				border-radius: 8/@rem;
			}
			span{
				padding: 6/@rem 8/@rem;
				color: #fff;
				font-size: 20/@rem;
				background: #ee5655;
				border-radius: 8/@rem;
			}
		}
		.list_main{
			margin-top: 8/@rem;
			color: #858585;
			font-size: 26/@rem;
			line-height:2;
			transition: 0.6s;
		}
	}
}
</style>