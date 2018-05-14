//引入依赖文件
import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import {setCatch,getCatch,_api_key,_api_security,user_id,encryption} from "../assets/js/common";
import {vipcnlogin,getfinancenews,getstocklist,getnarratelist,getteacheropinion,gettraderead,getwindpostion,getpastlayout,gettodaylayout,gettextstream,getpostionchange,serch,getuserinfo} from "../assets/js/config";

vue.use(vuex); //往插件注入仓库

vue.prototype.custom={
	common:{
		setCatch,
		getCatch,
		api_key:_api_key,
		api_security:_api_security,
		user_id
	},
};
vuex.Store.prototype.axios=axios;
vuex.Store.prototype.ajax=function ajax(json){   //ajax调用函数
	if(!json.link) return;
	let link=json.link;
	let type=json.type?json.type:"get";
	let data=json.data?json.data:{};
	if(json.type=="get"){
		var hash="&";
		for(var attr in data){
			hash+=attr+"="+data[attr]
		}
		return axios.get(link+hash).then(resolve.bind(this),reject.bind(this))
	}else{
		return axios.post(link,data).then(resolve.bind(this),reject.bind(this))
	}
    function resolve(success){
		if(success.data.status==2){    //用户身份错误	
			this.commit("submitPrompt",{
				flag:true,
				text:'您还未登陆或者已经在其他设备上登录！！！',
				status:2
			})
			setCatch(_api_key,"");
			setCatch(_api_security,"");
			setCatch(user_id,"");
			setCatch("modal","");
//			this.state.modalFlag=false;
			this.state.api_key=this.state.vip_security=this.state.user_id="";
			return Promise.reject("身份验证出错了！！！");
		}else{
			return Promise.resolve(success);
		}
	}
    function reject(error){
    	this.commit("submitPrompt",{
			flag:true,
			text:'网络可能出现了问题，请稍后再试！！！',
			status:3
		});
		return Promise.reject("网络可能出现了问题，请稍后再试！！！");
	}
}

var vuexss=new vuex.Store({
	state:{
		newsArr:{    //新闻列表
		   page:1,
		   data:[],
		   text:'',
		   flag:false
		},
		StockArr:{   //股票池
		   page:1,
		   data:[],
		   text:'',
		   flag:false
		},
		LiverArr:{   //直播列表
		   page:1,
		   data:[],
		   text:'',
		   flag:false
		},
		teacherArr:{   //老师观点
		   page:1,
		   data:[],
		   text:'',
		   flag:false
		},
		IndustryArr:{  //行业精读
		   page:1,
		   data:[],
		   text:'',
		   flag:false
		},
		todayArr:{     //今日布局
		   page:1,
		   data:[],
		   text:'',
		   flag:false
		},
		historyArr:{     //历史布局
		   page:1,
		   data:[],
		   text:'',
		   flag:false
		},
		api_key:getCatch(_api_key)?getCatch(_api_key):"",
		vip_security:getCatch(_api_security)?getCatch(_api_security):"",
		user_id:getCatch(user_id)?getCatch(user_id):"",
		prompt:{flag:false,text:'',status:0},
		headerIndex:0,
		previosIndex:0,
		modalFlag:false
	},
	getters:{
		
	},
	mutations:{
		setProis(state,data){
			state.previosIndex=data
		},
		test(state,data){
			state.headerIndex=data
		},
		setUserInfo(state,data){
			state.api_key=data.api_key;
			state.vip_security=data.vip_security;
			state.user_id=data.user_id;
		},
		setDatas(state,json){    //设置请求到的数据
			if(json.data.constructor==Array&&state[json.name].page==1){   //第一次就没有数据的时候
				state[json.name].flag=true;
				return
			}
			if(state[json.name].page>json.data.pages.totalPage){  //已经到总页数了
				state[json.name].text="已经到底了！！！"
				return
			}   
			state[json.name].flag=false;
			state[json.name].page++;
			state[json.name].data=state[json.name].data.concat(json.data.data);
		},
		clearDatas(state,data){
			state[data]={
			   page:1,
			   data:[],
			   text:'',
			   flag:false
			}
		},
		submitPrompt(state,data){
			state.prompt=data
		},
		setModalFlag(state,flag){
			state.modalFlag=flag
		}
	},
	actions:{
		logIn(store,data){   //登录
			var url=encryption({
				"link":vipcnlogin
			});		
			return this.ajax({
				link:url,
				data,
				type:'post'
			})
		}, 
		getNews(store,data){   //获取新闻列表
			var url=encryption({
				"link":getfinancenews,
				"sign":{
					page:data
				}
			});		
			return this.ajax({
				link:url,
				data:{
					page:data
				},
				type:'get'
			})
		},
		getStock(store,data){  //获取股票列表
			var url=encryption({
				"link":getstocklist,
				"sign":{
					page:data
				}
			});		
			return this.ajax({
				link:url,
				data:{
					page:data
				},
				type:'get'
			})
		},
		getLive(store,data){  //获取文字直播列表
			var url=encryption({
				"link":getnarratelist,
				"sign":{
					page:data
				}
			});		
			return this.ajax({
				link:url,
				data:{
					page:data
				},
				type:'get'
			})
		},
		getTeacher(store,data){   //获取名师观点列表
			var url=encryption({
				"link":getteacheropinion,
				"sign":{
					page:data
				}
			});		
			return this.ajax({
				link:url,
				data:{
					page:data
				},
				type:'get'
			})
		},
		getIndustry(store,data){   //获取行业精读
			var url=encryption({
				"link":gettraderead,
				"sign":{
					page:data
				}
			});		
			return this.ajax({
				link:url,
				data:{
					page:data
				},
				type:'get'
			})
		},
		getPosition(store){   //获取大盘风向
			var url=encryption({
				"link":getwindpostion,
			});		
			return this.ajax({
				link:url,
				type:'get'
			})
		},
		getStocks(store,data){
			var url=encryption({
				"link":Number(data.link)?getpastlayout:gettodaylayout,
				"sign":{
					page:data.page
				}
			});		
			return this.ajax({
				link:url,
				type:'get',
				data:{
					page:data.page
				}
			})	
		},
		getStockDetail(store,data){
			var url=encryption({
				"link":Number(data.link)?getpostionchange:gettextstream,
				"sign":{
					"stock_id":data.id
				}
			});		
			return this.ajax({
				link:url,
				type:'get',
				data:{
					"stock_id":data.id
				}
			})	
		},
		getSerch(store,data){
			return axios.get(serch,{
				params:data
			}).then((success)=>{
				return Promise.resolve(success)
			},(error)=>{
				return Promise.resolve(error)
			});
//			var url=encryption({
//				"link":'/check',
//				"sign":data
//			});		
//			return this.ajax({
//				link:url,
//				type:'get',
//				data
//			})	
	},
	getuserinfo(store){
		var url=encryption({
			"link":getuserinfo
		});		
		return this.ajax({
			link:url,
			type:'get',
		})	
	},
	}
});
console.log(vuexss)
export default vuexss