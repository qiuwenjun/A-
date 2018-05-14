<template>
	<div id="check">
		<div class="header">
			<form class="search">
				<!--<div class="checks">
					<button @click="searchs">查股东</button>					
					<input type="text" v-model="checks" placeholder="请输入机构/牛散/股东的关键字" />
				</div>-->
				<div class="checkShare">
					<button@click="searchShare" >查一查</button>
					<input type="text" v-model="Share" placeholder="请输入股票代码/简称" />
				</div>
			</form>
		</div>
		<div class="main">
			<div>
				<h2><span>查询</span>结果展示</h2>
			</div>
			<div class="main-content">
				<div class="nodata" v-if="!data">---未能查询到相关数据，试试其他的吧---</div>
				<div v-else v-for="item,index in data" class="header_content">
			        <div class="header-top">
			        	<h2 class="Stock_name"><strong v-text="item.SECUABBR"></strong> ({{item.TRADINGCODE}}) </h2>
			        	<time class="create_time">更新时间:{{item.ENDDATE}}</time>
			        	<div class="header_right">
			        		<p><span>股东名称:</span>{{item.SHNAME}}</p>
			        	</div>
			        </div>
			        <div class="header-center">
			        	<div class="header-center-left">
			        		<p class="header-center-left_index"><span>持股数（万）:</span>{{item.HOLDSHARE}}</p>
			        		<p class="header-center-left_index" :style="{color:item.NEWCLOSINGPRICE<0?'#4caf50':'grey'}"><span>现价:</span>{{item.NEWCLOSINGPRICE}}</p>
			        		<!--<p class="header-center-left_bfb"><span>区间涨跌幅(%):</span>{{data.p}}</p>-->
			        		<p class="header-center-left_bfb" :style="{color:item.CHANGEINPERIOD=='减小'?'#4caf50':'grey'}"><span>增减变化:</span>{{item.CHANGEINPERIOD}}</p>			        		
			        	</div>
			        	<div class="header-center-right">
			        		<p class="header-center-left_index"><span>比例（%）:</span>{{item.PCTTOTALSHARE}}</p>
			        		<p class="header-center-left_monery" :style="{color:item.CLOSINGPRICEOFENDDATE<0?'#4caf50':'grey'}"><span>更新日收盘价:</span>{{item.CLOSINGPRICEOFENDDATE}}</p>
			        		<p class="header-center-left_bfb" :style="{color:item.CHANGESHARE<0?'#4caf50':'grey'}"><span>变化数量（万）:</span>{{item.CHANGESHARE}}</p>
			        	</div>
			        </div>		
			</div>
				<!--<div class="clearfix institutions">
					<div>
						<i class="iconfont icon-huangguan"></i>
						<span>机构</span>
					</div>
					<div>
						<ul>
							<li>中国基建</li>
							<li>中国证券金融</li>
							<li>中央汇金</li>
							<li>中国平安+易方达</li>
							<li>梧桐树投资</li>
						</ul>
					</div>
				</div>
				<div class="clearfix private">
					<div>
						<i class="iconfont icon-huangguan"></i>
						<span>机构</span>
					</div>
					<div>
						<ul>
							<li>中国基建</li>
							<li>中国证券金融</li>
							<li>中央汇金</li>
							<li>中国平安+易方达</li>
							<li>梧桐树投资</li>
						</ul>
					</div>
				</div>
				<div class="clearfix scattered">
					<div>
						<i class="iconfont icon-huangguan"></i>
						<span>机构</span>
					</div>
					<div>
						<ul>
							<li>中国基建</li>
							<li>中国证券金融</li>
							<li>中央汇金</li>
							<li>中国平安+易方达</li>
							<li>梧桐树投资</li>
						</ul>
					</div>
				</div>-->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:"check",
		data(){
			return{
//				checks:"",
				Share:"",
				data:'',
			}
		},
		methods:{
//			searchs(ev){
//				ev.preventDefault();
//				if(this.checks){
//					this.$store.dispatch("getSerch",{
//						shName:this.checks
//					})
//				}else{
//					this.$store.commit("submitPrompt",{
//						flag:true,
//						text:"关键字不能为空！！！",
//						status:1
//					})
//				}
//			},
			searchShare(ev){
				ev.preventDefault();
				if(this.Share){
					this.$store.dispatch("getSerch",{
						tradingcode:this.Share
					}).then((success)=>{
						console.log(success.data)
						if(success.data.status==0){
							if(success.data.data.root){
								this.data=success.data.data.root;
							}
						}else{
							this.$store.commit("submitPrompt",{
								flag:true,
								text:"抱歉！未能查询到相关信息。",
								status:1
							})
						}
					},(error)=>{
				 	  	 console.log(error)
				 	})
				}else{
					this.$store.commit("submitPrompt",{
						flag:true,
						text:"股票代码或简称不能为空！！！",
						status:1
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@rem:75rem;
	#check{
		*{
			box-sizing: border-box;
		}
		.header{
			height: 375/@rem;
			background: url(../assets/img/banner_02.jpg) no-repeat center center;
			background-size: 100% 100%;
			padding-top: 212/@rem;
			.search{
				width: 600/@rem;
				margin: 0 auto;
				div{
					height:56/@rem;
					position: relative;
					margin-bottom: 20/@rem;
					border-radius: 3/@rem;
					overflow: hidden;
					input{
						width: 100%;
						display: block;
						height: 100%;
						border: none;
						outline: none;
						font-size: 24/@rem;
						padding-left: 10/@rem;
					}
					input::-webkit-input-placeholder{
						font-size: 24/@rem;
						color: #6c6c6c;
						line-height: 2;
						transform: scale(1);
						transition: transform 0.6s;
						transform-origin:left center;
					}
					input:focus::-webkit-input-placeholder{
						transform: scale(0);
					}
					button{
						cursor: pointer;
						font-size: 24/@rem;
						position: absolute;
						right: 0;
						top:0;
						display: block;
						height: 100%;
						background: #ecb236;
						outline: none;
						border: none;
						width: 120/@rem;
						line-height: 2;
						transition:box-shadow 0.6s ;
						box-shadow:none;
					}
					button:active{
						box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
					}
				}
			}
		}
		.main{
			>div:first-child{
				padding: 18/@rem 0;
				border-bottom: 2/@rem solid #eaeaea;
				h2{
					font-weight: 800;
					text-align: center;
					font-size: 32/@rem;
					color: #333;
					position: relative;
					span{
						color: #cc0000;
					}
					&:after{
						display: block;
						content:"";
						width: 20%;
						left: 50%;
						bottom: -50%;
						transform: translateX(-50%);
						height: 2/@rem;
						background: #ccc;
						position: absolute;
					}
				}	
			}
			.main-content{
				padding: 20/@rem;
				.nodata{
					text-align: center;
					font-size: 24/@rem;
					color: #f00;
				}
				.header_content{
					box-shadow: 0 0 30/@rem rgba(0,0,0,0.4);
					border-radius: 15/@rem;
					overflow: hidden;
					background: #fff;
					height: 100%;
					margin-bottom: 20/@rem;
				}
				.header-top{
					position: relative;
					padding: 30/@rem 35/@rem 0/@rem;
					background-size: contain;
				}
				.header-top h2{
					font-size: 48/@rem;
					color: #6a6a6a;
				}
				.header-top h2 strong{
					position:relative;
					font-weight: 800;
					color: #515151;
				}
				.header-top h2 strong:after{
					display: block;
					width: 100%;
					height: 6/@rem;
					position: absolute;
					content: "";
					background: -webkit-linear-gradient(left,#ef5857,#fb7271);
				}
				.header-top time{
					position: absolute;
					right: 5%;
					top: 20%;
					line-height: 80/@rem;
					font-size: 22/@rem;
					color: #8e8e8e;
				}
				.header-top .header_right{
					margin-top: 20/@rem;
					font-size: 24/@rem;
				}
				.header-center{
					padding: 0 35/@rem 35/@rem;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					overflow: hidden;
					background: #fff;
					margin-top: 20/@rem;
				}
				.header-center>div p{
					color:grey;
					font-size: 30/@rem;
					font-weight: 800;	
					margin-bottom: 10/@rem;
				}
				.header-center>div p span{
					color:grey;
				}

				/*div{
					padding: 15/@rem;
					background: #e9e9e9;
					display: flex;
					height: 200/@rem;
					div:first-child{
						text-align: center;
						width:60/@rem;
						font-size: 32/@rem;
						display:flex;
						flex-direction:column;
						height:100%;					
						i{
							font-size: 32/@rem;
							color: #fff;
						}
						span{
							font-weight: 600;
							color: #cf1818;
						}
					}
					div:last-child{
						margin-left: 20/@rem;
						width: 640/@rem;
						background: #f2f0f0;
						height: 100%;
						border-radius: 30/@rem;
						position: relative;
						padding-left: 35/@rem;
						ul{
							width: 100%;
							overflow: hidden;
							li{
								float: left;
								margin: 10/@rem 20/@rem 10/@rem 0;
								border: 2/@rem solid #d2d2d2;
								color: #cf1818;
								font-size: 28/@rem;
								padding: 5/@rem 8/@rem;
								background: #fff;
								border-radius: 5/@rem;
							}
						}
						&:before{
							display: block;
							content: "";
							width:  30/@rem;
							height: 49/@rem;
							background: url(../assets/img/inco_03.png) no-repeat center center;
							background-size:100% 100%;
							position: absolute;
							left: -2%;
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}*/
			}
		}
	}
</style>