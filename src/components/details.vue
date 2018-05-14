<template>
	<div class="gupiaochiDetails">
			<header class="product-enter">
				 <div class="product-enter-title">
				 	  <div>
				 	  	<h3 v-text="data.stock_name"></h3>
				 	  	<time>推荐时间:<span v-text="data.send_time"></span></time>
				 	  </div>
				 	  <p v-text="data.stock_tag"></p>
				 </div>
				 <dl>
				   	<dt v-text="data.now_pri"></dt>
				   	<dd :style="{color:data.price>0?'#f00':''}" v-text="data.price"></dd>
				   	<dd :style="{color:data.to.substring(0,data.to.indexOf('%'))>0?'#f00':''}" v-text="data.to"></dd>
				 </dl>
				 <ul>
				 	  <li>
				 	  	<h4>今开</h4>
				 	  	<p v-text="data.start_pri">6.54</p>
				 	  </li>
				 	  <li>
				 	  	<h4>昨收</h4>
				 	  	<p v-text="data.end_pri">6.54</p>
				 	  </li>
				 	  <li>
				 	  	<h4>最高</h4>
				 	  	<p v-text="data.today_max">6.54</p>
				 	  </li>
				 	  <li>
				 	  	<h4>最低</h4>
				 	  	<p v-text="data.today_min">6.54</p>
				 	  </li>
				 </ul>
			</header>
			<section class="main">
				 <h2>推荐理由</h2>
				 <div class="teacher_introduced">
				 	  <div>
				 	  	<h3 v-text="data.teacher_name"></h3>
				 	  	<p>资格证书编号：<span v-text="data.teacher_number"></span></p>
				 	  </div>
				 </div>
				 <div class="instructions" v-html="data.stock_description">
				 	
				 </div>
			</section>
			<article class="fixed">
				郑重提示：本服务提供的相关数据均出自港澳资讯大数据终端；个股信息由港澳资讯分析团队经过了综合的研判，但不能保证百分之百获利；据此操作，风险自担，建议严控风险。股市有风险，入市需谨慎。
			</article>
	</div>
</template>

<script>
	export default {
		name:'detail',
		props:["data"],
	}
</script>

<style lang="less" scoped>
	@rem:75rem;
	.gupiaochiDetails{
		padding: 20/@rem 20/@rem 25%;
		.product-enter{
			padding: 30/@rem;
			background: #fff;
			border-radius: 12/@rem;
			.product-enter-title{
				padding-bottom: 30/@rem;
				display: flex;
				justify-content: space-between;
				border-bottom: 2/@rem solid #eee;
				div{
					h3{
						color: #525156;
						font-size: 36/@rem;
						font-weight: 600;
						margin-bottom: 10/@rem;
					}
					time{
						color: #858585;
						font-size:24/@rem;
					}
				}
				p{
					width: 200/@rem;
					height: 56/@rem;
					background: url(../assets/img/title.png) no-repeat center center;
					background-size:100% 100%;
					font-size: 32/@rem;
					text-align: center;
					color: #fff;
					line-height: 56/@rem;
				}
			}
		  dl{
		  	display: flex;
		  	justify-content: space-around;
		  	align-items:center;
		  	height: 180/@rem;
		  	font-weight: 600;
		  	dt{
		  		color: #858585;
		  		font-size: 90/@rem;
		  		width: 395/@rem;
		  		padding-left: 20/@rem;
		  	}
		  	dd{
		  		font-size: 36/@rem;
		  		color:#3acaa0;
		  	}
		  }
		  ul{
		  	display: flex;
		  	justify-content: space-around;
		  	li{
		  		*{
		  			color: #525156;
		  			font-size: 30/@rem;
		  		}
		  		h4{
		  			font-weight: 600;
		  		}
		  	}
		  }
		}
		.fixed{
			position: fixed;
			width: 100%;
			padding: 20/@rem;
			font-size: 20/@rem;
			color: #c9c9c9;
			text-indent: 2em;
			line-height: 30/@rem;
			background: #fff;
			bottom: 0%;
			left: 0%;
			box-sizing: border-box;
		}
		.main{
			border-radius: 15/@rem;
			overflow: hidden;
			margin-top: 20/@rem;
			padding-bottom: 30/@rem;
			background: #fff;
			h2{
				padding: 16/@rem 30/@rem 20/@rem;
				font-size: 36/@rem;
				color: #fff;
				background: #df4758;
			}
			.teacher_introduced{
				padding: 30/@rem;
				display: flex;
				border-bottom: 2/@rem solid #eee;
				img{
					width: 100/@rem;
					height: 100/@rem;
				}
				div{
					margin-left: 20/@rem;
					h3{
						color: #525156;
						font-size:30/@rem
					}
					p{
						margin-top: 8/@rem;
						color: #858585;
						font-size: 26/@rem;
					}
				}
			}
			.instructions{
				padding: 0 30/@rem;
				margin:30/@rem 0 0;
			}
		}
	}
</style>