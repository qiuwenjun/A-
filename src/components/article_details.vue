<template>
	<div class="article_details">
		<header>
			<h2 v-text="datas.title"></h2>
			<address>
				<mark>作者:<span v-text="datas.user_name"></span></mark>
				<time>时间:<span v-text="datas.cdate"></span></time>
			</address>			
		</header>
		<div class="details">
			<h3>文章导语:</h3>
			<p v-text="datas.brief"></p>
			<!--<div><mark class="success"></mark><mark class="success"></mark></div>-->
		</div>
		<article>
			<p v-html="datas.content"></p>
		</article>
	</div>
</template>

<script>
	export default {
		name:"article_details",
		props:["data","id","name"],
		data(){
			var re=/(<gf-img>)(.*)(<\/gf-img>)/g
			this.data.content=this.data.content.replace(re,function($0,$1,$2,$3){
				return "<img src='"+$2+"'>"
			});
			this.data.content=this.data.content.replace(/\n/g,function($0,$1){
				return "<br />"
			});
			return{
				datas:this.data
			}
		},
		mounted(){
			var iHeight=this.$el.offsetHeight;
			var iClient=document.body.clientHeight||document.documentElement.clientHeight;
			if(iHeight<iClient){
				this.$el.style.height=iClient+'px';
			}
		},
		beforeRouteLeave(to,from,next){
			if(to.path=='/teacherPoint'){
				to.params.name=from.params.request
			}
			next()
		},
	}
</script>

<style lang="less" scoped>
  @rem:75rem;
  .article_details{
  	padding: 50/@rem;
  	background: #fff;
  	box-sizing:border-box;
  	header{
  		h2{
    		font-size: 38/@rem;
  			color: #3c3c3c;
  			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;			
  		}
		address{
			font-size: 26/@rem;
			color: #858585;
			line-height: 2;			
			mark{
				color: #858585;
				background: none;
				margin-right: 20/@rem;
			}
		}
  	}
  	.details{
  			margin: 20/@rem auto;
  			h3{
  				color: #525156;
  				font-size: 30/@rem;
  			}
  			p{
  				font-size: 22/@rem;
  				color: #858585;
  				line-height: 2;
  			}
  			div{
  				margin: 10/@rem auto 15/@rem;
  				mark{
  					border-radius: 10/@rem;
  					padding:6/@rem 10/@rem;
  					font-size: 20/@rem;
  					margin:0 10/@rem;
  					color: #fff;
  				}
  				mark.success{
  					background: #7ecef4;
  				}
  				mark.active{
  					background: #ee5655;
  				}
  			}
  	}
  	article{
  		p{
  			font-size: 22/@rem;
  			color: #858585;
  			line-height: 2;
  			img{
  				display: block;
  				vertical-align: top;
  			}
  		}
  	}
  }
</style>