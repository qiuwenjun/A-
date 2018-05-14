<template>
	<div id="castList">
		<div class="header">
			<div>
				<h2>大盘指数</h2>
				<p>跌幅若达5%请严格止损</p>
				<ul class="market">
					<li :class="{active:statusIndex==i}" v-for="item,i in statusArr">
						<div><span></span></div>
						<p>{{item}}</p>
					</li>
				</ul>				
			</div>
		</div>
		<section class="main">
			<header class="header">
				<ul @click="change">
					<li data-index="0" :class="{active:headerIndex==0}" >今日布局</li>
					<li data-index="1" :class="{active:headerIndex==1}">历史布局</li>
				</ul>
			</header>
			<div class="main-content">
				<keep-alive>
					<component :is="Number(headerIndex)?'historyComponent':'todayComponent'"></component>
				</keep-alive>
			</div>
		</section>
	</div>
</template>

<script>
	import todayComponent from "./layout/today";
	import historyComponent from "./layout/history";
	
	export default {
		name:'theMenu',
		data(){
			return {
				statusArr:["极弱","较弱","平稳","较强","超强",],
				position:0,
				headerIndex:this.$store.state.previosIndex,
				flag:[true,true]
			}
		},
		computed:{
			statusIndex(){
				if(this.position<=20){
					return 0
				}else if(this.position<=40){
					return 1
				}else if(this.position<=60){
					return 2
				}else if(this.position<=80){
					return 3
				}else if(this.position<=100){
					return 4
				}
			}
		},
		components:{
			todayComponent,
			historyComponent
		},
		created(){
			//获取大盘风向
			this.$store.dispatch("getPosition").then((success)=>{
				if(success.data.status==0){
					this.position=success.data.data.postion
				}else if(success.data.status){
					this.$store.commit("submitPrompt",{
						flag:true,
						text:success.data.error,
						status:1
					})
				}
			},function(error){
				console.log(error)	
			});
			//获取对应的首次数据
			this.firstGetStock();
		},
		mounted(){
			var iHeight=document.body.clientHeight||document.documentElement.clientHeight;
			this.header=this.$el.querySelector(".header");
			this.Main=this.$el.querySelector(".main");
			this.MainHeader=this.Main.querySelector(".header");
			this.MainContent=this.Main.querySelector(".main-content");
			this.MainContent.style.height=iHeight-this.header.offsetHeight-this.MainHeader.offsetHeight+'px';
		},
		methods:{
			firstGetStock(){
				this.$store.dispatch("getStocks",{
					"link":this.headerIndex,
					"page":1
				}).then((success)=>{
					this.flag[this.headerIndex]=false;
					if(success.data.status==0){
						this.$store.commit("clearDatas",Number(this.headerIndex)?"historyArr":"todayArr");
						this.$store.commit("setDatas",{
							data:success.data.data,
							name:Number(this.headerIndex)?"historyArr":"todayArr"
						});
					}else if(success.data.status==1){
						this.$store.commit("submitPrompt",{
							flag:true,
							text:success.data.error,
							status:1
						})
					}
				},function(error){
					console.log(error)	
				});
			},
			change(ev){
				var ev=window.event||ev;
				var target=ev.srcElement||ev.target;
				this.headerIndex=target.dataset.index?target.dataset.index:this.headerIndex;
				this.$store.commit("setProis",this.headerIndex);
				if(this.flag[this.headerIndex]){
					this.firstGetStock();
				}
			}
		}
	}
</script>

<style lang="less">
	@rem:75rem;
	#castList{

		background: #ef5857;
		>.header{
			padding: 0 15/@rem;
			div{
				box-sizing:border-box;
				padding: 35/@rem 20/@rem 0;
				height: 288/@rem;
				background: url(../assets/img/bg1.png) no-repeat center bottom,#fff;
				background-size:727/@rem 141/@rem;
				h2{
					text-align: center;
					line-height: 1.6;
					color: #df4758;
					font-size: 48/@rem;
					font-weight: 800;
				}
				p{
					font-size: 18/@rem;
					color: #f00;
					text-align: center;
					margin: 0.1rem 0 0.2rem;
				}
				.market{
					display: flex;
					justify-content: space-around;
					li{
						width: 76/@rem;
						position: relative;
						div{
							position: relative;
							z-index: 9;
							box-sizing: border-box;
							border-radius: 50%;
							height: 76/@rem;
							padding: 8/@rem;
							box-shadow:inset 0 0 20/@rem #736c6c; 
							background: #c2c2c2;
							margin-bottom: 10/@rem;
							span{
								display: block;
								width: 60/@rem;
								height:60/@rem;
								margin:0 auto;
								border-radius: 50%;
								background: -webkit-radial-gradient(#949495 0%, #858586 100%);
								box-shadow: 0 0 10px rgba(0,0,0,1);
							}
						}
						p{
							font-size: 20/@rem;
							color: #9b9b9c;	
							font-weight: 600;	
						}
						&:before{
							z-index: 8;
							display: block;
							content: "";
							left: -88%;
							transform: translateY(-100%);
							top: 45%;
							height: 10/@rem;
							width:75/@rem;
							position: absolute;
							background: #b6b6b6;
						}
						&.active{
							div{
								span{
									background: -webkit-radial-gradient(#f66867 0%, #f25e5d 100%);
									box-shadow: 0 0 10px rgba(255,0,0,1);	
								}
							}
							p{
								color: #df4758;		
							}
						}
					}
					li:first-child{
						&:before{
							display: none;
						}
					}
				}	
			}	
		}
		.main{
			margin-top: 10/@rem;
			.header{
				border-radius: 20/@rem 20/@rem 0 0;
				background: #fff;
				ul{
					padding: 25/@rem 0 15/@rem;
					display: flex;
					justify-content: space-around;
					li{
						font-size: 32/@rem;
						padding-bottom: 5/@rem;
						color: #8e8e8e;
						cursor: pointer;
					    &.active{
					    	color: #ee5655;
							border-bottom: 3/@rem solid #ee5655;
					    }	
					}
				}
			}
			.main-content{
				box-shadow: inset 0 3/@rem 10/@rem rgba(0,0,0,0.2);
				background: #f4f4f4;
				box-sizing: border-box;
				position: relative;
				>div{
					/*&.active{
						display: block;
					}
					display: none;*/
				 	position: absolute;
				 	left: 0;
				 	bottom:0;
				 	right: 0;
				 	top: 0;
					padding: 24/@rem;
					overflow: auto;
				 	.today_content{
				 		.the_data{
				 			&.active{
				 				 filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);    
				 				 -webkit-filter: grayscale(100%);
				 			}
				 			margin-bottom: 20/@rem;
				 			width: 100%;
				 			padding: 20/@rem 30/@rem;
				 			box-sizing: border-box;
				 			background: #fff;
				 			border-radius: 10/@rem;
				 			box-shadow: 0 0 12/@rem rgba(0,0,0,0.4);
				 			position: relative;	
				 			header{
				 				display: flex;
				 				align-items: center;
				 				padding: 0 0 15/@rem;
				 				h2{
				 					font-size: 32/@rem;
				 					color: #505050;
				 				}
				 				time{
				 					font-size: 24/@rem;
				 					color: #8e8e8e;
				 					margin-left: 20/@rem;
				 				}
				 			}
				 			.table{
				 				position: absolute;
				 				width: 100%;
				 				height: 3/@rem;
				 				background: #eee;
				 				left: 0%;
				 				top: 72/@rem;
				 				&:before,&:after{
				 					display: block;
				 					position: absolute;
				 					content: "";
				 					background-repeat: no-repeat;
				 					background-position: center center;
				 					background-size: 100% 100%;
				 					width: 9/@rem;
				 					height: 17/@rem;
				 					top: 50%;
				 					transform: translateY(-50%);
				 				}
				 				&:before{
				 					left: 0;
				 					background-image: url(../assets/img/inco_left.jpg);
				 				}
				 				&:after{
				 					transform:translateY(-50%) rotateZ(-180deg);
				 					right: 0;
				 					background-image: url(../assets/img/inco_left.jpg);
				 				}
				 			}
				 			.main{
				 				margin-bottom: 15/@rem;
				 				>div:first-child{
				 					text-align: right;
				 					font-size: 24/@rem;
				 					color: #8e8e8e;
				 				}
				 				>div:nth-child(2){
				 					display: flex;
				 					padding: 10/@rem 0 15/@rem;
									div{
				 					  width:50%;
				 					  text-align: center;
				 					  h3{
				 					  	font-size: 72/@rem;
				 					  	color: #000;
				 					  	span{
				 					  		font-size: 20/@rem;
				 					  	}
				 					  }
				 					  p{
				 					  	font-size: 24/@rem;
				 						color: #8e8e8e;
				 						text-align: right;
				 					  }
									}
				 				}
				 				>div:last-child{
				 					p{
				 						word-break: break-all;
				   						word-wrap: break-word;
				   						font-size: 24/@rem;
				   						color: #8d8d8d;
				   						line-height: 2;
				 					}
				 				}
				 			}
				 			.footer{
				 				position: absolute;
				 				width: 100%;
				 				height: 3/@rem;
				 				background: #eee;
				 				left: 0%;
				 				bottom:90/@rem;
				 			}
				 			footer{
				 				padding: 15/@rem 0 0;
				 				text-align: center;
				 				a{
				 					color: #8e8e8e;
				 					font-size: 32/@rem;
				 				}
				 			}
				 		}
				 	}
				 }
			}
		}
	}
</style>