<template>
	<div id="login">
		<h1><img src="../assets/img/logo.png"></h1>
		<h2>点击客服按钮领取账号，登陆后即可访问直播室</h2>
		<div class="Customer_service"><a href="http://wpa.qq.com/msgrd?v=3&uin=2881681084&site=qq&menu=yes">联系客服</a></div>
		<div class="login_dialog">
			<div class="dialog">
				<span class="iconfont icon-gerenzhanghuguanli"></span>
				<input type="text" @focus="changed('account')" v-model="from.account.input" placeholder="账号" />
				<i :style="{display:from.account.flag?'block':'none'}" v-text="from.account.title"></i>
			</div>
			<div class="dialog">
				<span class="iconfont icon-mima"></span>
				<input type="password" @focus="changed('pwd')" v-model="from.pwd.input" v-text="from.pwd.title" placeholder="密码" />
				<i :style="{display:from.pwd.flag?'block':'none'}" v-text="from.pwd.title"></i>
			</div>
			<div class="prompt">
				<div class="checked">
					<input type="checkbox" v-model="from.confirm.input" id="checked" />
					<label for="checked"></label>
				</div>
				<p :class="{active:from.confirm.flag}">
					我已阅读并同意相关
					<router-link :to="{name:'book'}">《服务条款》</router-link>
				    及  
				    <router-link :to="{name:'book'}">《风险提示》</router-link>   
				</p>
			</div>
			<div class="submit">
				<button type="submit" @click="submit">登录</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name:"login",
		data(){
			return{
				from:{
					account:{
						name:"账号",
						input:"",
						flag:false,
						title:""
					},
					pwd:{
						name:"密码",
						input:"",
						flag:false,
						title:""
					},
					confirm:{
						name:"服务条款和风险提示",
						input:false,
						flag:false,
						title:""
					}
				}
				
			}
		},
		methods:{
			changed(title){
				this.from[title].flag=false;
			},
			submit(){
				var flag=true;
				var data={};
				for(let attr in this.from){
					if(!this.from[attr].input){
						this.from[attr].title=this.from[attr].name+'有误';
						this.from[attr].flag=true;
						flag=false;
						setTimeout(()=>this.from[attr].flag=false,1500)
						break
					}else{
						if(attr=="confirm") break
						data[attr]=this.from[attr].input;
					}
				}
				if(!flag) return 
				//本地验证通过,开始提交后台
				this.$store.dispatch("logIn",data).then((success)=>{
					if(success.data.status==0){
						var data=success.data.data;
						var vue=this.custom.common;
						vue.setCatch(vue.api_key,data.api_key);
						vue.setCatch(vue.api_security,data.vip_security);
						vue.setCatch(vue.user_id,data.user_id);
						this.$store.commit("setUserInfo",data);
						this.$store.commit("submitPrompt",{
							flag:true,
							text:"登录成功",
							status:0
						});
						setTimeout(()=>{
							this.$router.replace({path:'/'});
							var iStroage=localStorage.getItem("modal");
						  	if(iStroage) return;
						  	this.$store.commit("setModalFlag",true)
						  	localStorage.setItem("modal",'1');
						},1500);
					}else{
						this.$store.commit("submitPrompt",{
							flag:true,
							text:success.data.error,
							status:1
						})
					}
				},function(error){
					console.log(error)	
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@rem:75rem;
	#login{
		padding: 75/@rem 0;;
		background: #fff;
		h1{
			width: 490/@rem;
			height: 92/@rem;
			margin: 0 auto;
		}
		h2{
			text-align: center;
			font-size:30/@rem;
			color: #858585;
			margin-top: 80/@rem;
		}
		.Customer_service{
			display: flex;
			justify-content: center;
			a{
				width: 253/@rem;
				height: 80/@rem;
				border:3/@rem solid #ee5655;
				display: block;
				margin: 36/@rem 10/@rem 0;
				box-sizing: border-box;
				font-size: 36/@rem;
				color: #ee5655;
				text-align: center;
				line-height: 2;
				border-radius: 10/@rem;
			}
			
		}
		.login_dialog{
			margin: 125/@rem auto 75/@rem;
			.dialog{
				width: 620/@rem;
				margin: 0 auto;
				height: 70/@rem;
				display: flex;
				border: 2/@rem solid #eee;
				font-size: 30/@rem;
				margin-bottom: 50/@rem;
				transition: transform 0.6s;	
				position: relative;			
				span{
					width: 82/@rem;
					height:100%;
					display: block;
					color: #cacaca;
					font-size: 30/@rem;
					text-align: center;
					line-height: 2.3;
				}
				input::-ms-input-placeholder{
					color: #cacaca;
					transition: transform 0.6s;
					transform-origin: left center;
				}
				input::-moz-input-placeholder{
					color: #cacaca;
					transition: transform 0.6s;
					transform-origin: left center;
				}
				input::-webkit-input-placeholder{
					color: #cacaca;
					transition: transform 0.6s;
					transform-origin: left center;
				}
				input:focus::-webkit-input-placeholder{
					transform: scale(0);
				}
				input:focus::-ms-input-placeholder{
					transform: scale(0);
				}
				input:focus::-moz-input-placeholder{
					transform: scale(0);
				}
				input{
					color: #cacaca;
					border: none;
					outline: none;
					width: -webkit-calc(100% - 82/@rem);
				}
				i{
					position: absolute;
					bottom: -50/@rem;
					left: 0;
					font-style: normal;
					color: #f00;
					display: none;
					font-size: 20/@rem;
				}
				&.active{
					box-shadow:0 0 5px #7bc7fd ;
				}
			}
			.prompt{
				display: flex;
				font-size: 26/@rem;
				color: #cacaca;
				justify-content: center;
				.checked{
					input{
						display: none;
					}
					input:checked+label{
						&:before,&:after{
							position: absolute;
							display: block;
							content: "";
						}
						&:before{
							width:3/@rem;
							height:20/@rem;
							background: #cccbcb;
							transform: rotateZ(-50deg);
							left: 2/@rem;
							top: 6/@rem;
						}
						&:after{
							width:3/@rem;
							height:35/@rem;
							background: #cccbcb;
							transform: rotateZ(35deg);
							left: 18/@rem;
							top: -10/@rem;
						}
					}
					label{
						position: relative;
						width: 32/@rem;
						height: 32/@rem;
						box-sizing: border-box;
						display: block;
						border:3/@rem solid #eee;
						margin-right: 10/@rem;
					}
				}
				p{
					color: #000;
					a{
						color: #ee5655;
					}
					&.active{
						a{
							animation:color 2s ease-in-out both infinite alternate;	
						}
					}
				}
			}
			@keyframes color{
				0%{
					color: #ee5655;
				}
				100%{
					color: #f6ff01;
				}
			}
			.submit{
				width: 500/@rem;
				height: 90/@rem;
				margin: 80/@rem auto 0;
				button{
					display: block;
					height: 100%;
					width: 100%;
					outline: none;
					border: none;
					background: #ee5655;
					text-align: center;
					font-size: 34/@rem;
					color: #fff;
					border-radius: 10/@rem;
					cursor: pointer;
					transition: background 0.6s;
				}
				button:active{
					background:#cacaca
				}
			}
		}
	}
</style>