// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import swiper from "swiper"
import router from './router'
import store from './vuex'

import "./assets/css/style.css"
import "./assets/font/iconfont.css"
import "./assets/css/swiper.min.css"
import "./assets/js/index.min.js"

import App from './App'

Vue.config.productionTip = false

Vue.component("vue-model",{      //提示框
	computed:{
		 data(){
		 	var data=this.$store.state.prompt;
		 	if(data.status==2){
		 		setTimeout(()=>{
		 			this.$router.replace({path:"/login"});
		 			this.$store.state.prompt.flag=false;
		 		},1500);
		 	}else{
		 		setTimeout(()=>{
		 			this.$store.state.prompt.flag=false;
		 		},1500);
		 	}
		 	 return data
		 }
	},
	template:`
	    <div id="PromptTheUser" :class="{active:data.flag}">
			<div class="text">{{data.text}}</div>
		</div>
	`,
	
});
window.swiper=swiper;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
window.addEventListener("hashchange",function(ev){
	var target=ev.newURL.substring(ev.newURL.indexOf("#")+1);
//	console.log(target)
	router.replace({
		path:target
	})
},false);
