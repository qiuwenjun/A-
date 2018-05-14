//引入依赖文件
import Vue from 'vue';
import Router from 'vue-router';
import store from '../vuex/';

//引入需要映射的组件
const MainComponent = () => import('../components/Mains');
const NewsComponent = () => import('../components/news');
const StockPoolComponent = () => import('../components/StockPool');
const teacherPointComponent = () => import('../components/teacherPoint');
const UserComponent = () => import('../components/User');
const LiveComponent = () => import('../components/live');
const detailsComponent = () => import("../components/details");
const loginComponent = () => import("../components/login");
const bookComponent = () => import("../components/disclosure_book");
const hgxComponent = () => import("../components/hgx_book");
const articleComponent = () => import("../components/article_details");
const theMenuComponent = () => import("../components/theMenu");
const StockdetailComponent = () => import("../components/Stock_details");
const checkComponent = () => import("../components/check");
const menuComponent=()=>import("../components/menu/menu");
const userComponent=()=>import("../components/User");

Vue.use(Router);  //往插件注入路由

var router=new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      alias:'/main',
      components:{
      	default:MainComponent,
      	menu:menuComponent
      },
 			beforeEnter(to,from,next){
				routeGuard(to,from,next,{
					requetFn:"getNews",
 				 	name:"newsArr",
				});
 			}
    },
    {
      path: '/news',
      name: 'news',
      component: NewsComponent,
      beforeEnter(to,from,next){
 				 routeGuard(to,from,next,{
 				 	requetFn:"getNews",
 				 	name:"newsArr",
 				 });
      }
    },
    {
    	path:"/StockPool",
    	name:"StockPool",
    	component:StockPoolComponent,
    	beforeEnter(to,from,next){
 				 routeGuard(to,from,next,{
 				 	requetFn:"getStock",
 				 	name:"StockArr",
 				 });
      },
    },
    {
    	path:"/teacherPoint",
    	name:"teacherPoint",
    	component:teacherPointComponent,
    	props:true,
    	beforeEnter(to,from,next){
    		var name=to.params.name;
    		if(name=="getTeacher"||name=="getIndustry"){
    			to.params.arr=name=="getTeacher"?"teacherArr":"IndustryArr"
    			routeGuard(to,from,next,{
	 				 	requetFn:name,
	 				 	name:to.params.arr
   				});
    		}else{
    			router.replace({path:'/main'});
    		}
	    },
    },
	{
    	path:"/User",
    	name:"User",
    	components:{
    		default:userComponent,
      	menu:menuComponent
    	}
    },
	{
    	path:"/live",
    	name:"live",
    	component:LiveComponent,
    	beforeEnter(to,from,next){
	    	routeGuard(to,from,next,{
 				 	requetFn:"getLive",
 				 	name:"LiverArr",
 				});
	    }
	  },
    {
    	path:"/details",
    	name:'details',
    	component:detailsComponent,
    	props:true,
    	beforeEnter(to,from,next){
					if(to.params.name){
						var data=store.state[to.params.name].data,id=to.params.id;
						data=data.find(item=>{
							return item.id==id
						});
						if(data){
								var arr=data.stock_description.replace(/<p>|<\/p>/g,function($0,$1){
									return ''
								}).split('。')
								data.stock_description=arr.map((item,index)=>{
									item=item.replace(/style="white-space: nowrap;"/g,function($0){
										return ""
									});
									if(/<br\/>/.test(item)||!item){
										return ""
									}else{
									    return '<p style="font-size:0.3rem;color: #858585;word-break: break-all; word-wrap:break-word;line-height: 2;"">'+item+'。</p>'	
									}
								}).join('');	
							to.params.data=data;
							next();
						}else{
							store.commit("submitPrompt",{
								flag:true,
								text:"传入ID不正确，请检查！！！",
								status:1
							});
							setTimeout(()=>{
								router.replace(from.path)
							},1000);
						}
					}else{
						 router.replace(from.path)
					}
    	}
    },
    {
    	path:"/login",
    	name:'login',
    	component:loginComponent,
//  	beforeEnter(to,from,next){
//  		var vue=router.app.custom.common;
//  		var api_key=vue.getCatch(vue.api_key);
//  		var api_security=vue.getCatch(vue.api_security);
//  		if(api_key&&api_security){
//  			   router.replace({path:'/main'});
//  		}else{
//  			next();
//  		}
//  	}
    } ,
    {
    	path:"/book",
    	name:'book',
    	component:bookComponent
    },
    {
    	path:"/hgx",
    	name:'hgx',
    	component:hgxComponent
    },
    {
    	path:"/article",
    	name:'article',
    	component:articleComponent,
    	props:true,
    	beforeEnter(to,from,next){
    		if(to.params.name){
						var data=store.state[to.params.name].data,id=to.params.id;
						data=data.find(item=>{
							return item.id==id
						});
						if(data){		
							to.params.data=data;
							next();
						}else{
							store.commit("submitPrompt",{
								flag:true,
								text:"当前文章ID不正确",
								status:1
							});
							setTimeout(()=>{
								router.replace(from.path)
							},1000);
						}
					}else{
						 router.replace(from.path)
					}
    	}
    },
    {
    	path:"/theMenu",
    	name:'theMenu',
    	component:theMenuComponent,
    },
    {
    	path:"/Stock_details",
    	name:'Stock_details',
    	props:true,
    	component:StockdetailComponent,
    	beforeEnter(to,from,next){
    		if(to.params.name){
					var data=store.state[to.params.name].data,id=to.params.id;
					data=data.find(item=>{
						return item.id==id
					});
					if(data){		
						to.params.data=data;
						next();
					}else{
						store.commit("submitPrompt",{
							flag:true,
							text:"当前股票详情不存在",
							status:1
						});
						setTimeout(()=>{
							router.replace(from.path)
						},1000);
					}
				}else{
					 router.replace({name:'theMenu'})
				}
    	}
    },
    {
    	path:"/check",
    	name:'check',
    	component:checkComponent
    }
  ]
});
function routeGuard(to,from,next,json){
	var vuex;
	var vue=router.app.custom.common;
	var api_key=vue.getCatch(vue.api_key);
	var api_security=vue.getCatch(vue.api_security);	
  if(api_key&&api_security){
  	if(store){
	 	  Promise.resolve().then(resolve)
		}else{
		 	setTimeout(function(){
		 		Promise.resolve().then(resolve)
		 	},30);
		}
  }else{//身份验证不存在！！！
    router.replace({path:'/login'})
  }
 function resolve(){
    vuex=store;
 	  store.dispatch(json.requetFn,1).then((success)=>{
 	     if(success.data.status==0){
 	     	  vuex.commit("clearDatas",json.name);
 	     	  vuex.commit("setDatas",{
 	     	  	name:json.name,
 	     	  	data:success.data.data
 	     	  })
					next();
 	     }else{
 	     			vuex.commit("submitPrompt",{
							flag:true,
							text:success.data.errror,
							status:1
						});
 	     }
 	  },(error)=>{
 	  	 console.log(error)
 	  });		 
 }
}
router.beforeEach(function(to,from,next){
	var vue=router.app.custom.common;
	var api_key=vue.getCatch(vue.api_key);
	var api_security=vue.getCatch(vue.api_security);
	if(api_key&&api_security){
		if(to.path=='/login'){
			router.replace({path:'/main'});
		}else{
			next()
		}
	}else{
		if(to.path=='/login'||to.path=='/book'){
			next()
		}else{
			router.replace({path:'/login'});	
		}

	}
});
export default router
