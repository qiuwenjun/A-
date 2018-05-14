<template>
	<div class="index">
		<header class="header">
			<swiper></swiper>
		</header>
		<section class="main">
			<div class="menu">
				<ul>
					<li><a href="http://vip.webf10.com/index.html" class="iconfont icon-zhibo">直播室</a></li>
					<li><a href="http://vip1.gaotime.com/info-weixin/getWXAbstract.dhtml?ids=64C750CE4F7BA16CEF799CA2666F63FA" class="iconfont icon-ketang">微信精读</a></li>
					<li><router-link to="/StockPool" class="iconfont icon-gupiao">短线股票池</router-link></li>
					<li><a href="http://vip1.gaotime.com/stkclinic/ggzdIndex.do" class="iconfont icon-stethoscope">个股诊断</a></li>
					<li><router-link :to="{name:'teacherPoint',params:{name:'getTeacher'}}" class="iconfont icon-985caidan_zhuanjiawangluo">名师观点</router-link></li>
					<li><router-link :to="{name:'teacherPoint',params:{name:'getIndustry'}}" class="iconfont icon-hangye">机构晨报</router-link></li>
					<li><router-link to="/theMenu" class="iconfont icon-jingxuan">精选股票池</router-link></li>
					<li><router-link to="/check" class="iconfont icon-sousuo">查一查</router-link></li>
				</ul>
			</div>
			<article class="news">
				<header class="news-header">
					<h2>财经要闻</h2>
					<router-link to="news">更多 ></router-link>
				</header>
				<news :data="true" :flag="false"></news>
			</article>
		</section>
	</div>
</template>

<script>
	import swiper from "./swiper"
	import news from "./news";
	export default {
		name:"mains",
		components:{
			news,
			swiper
		},
		methods:{
		}
	}
</script>

<style scoped>
.header {
  width: 100%;
  height: 5.33333333rem;
  overflow: hidden;
}
.main {
  background: #eee;
  padding-bottom: 1.7rem;
}
.main .menu {
  width: 100%;
  height: 5.30666667rem;
  background: #fff;
}
.main .menu ul {
  height: 100%;
  display: flex;
  flex-flow: wrap;
}
.main .menu ul li {
  width: 25%;
}
.main .menu ul li a {
  height: 0.78666667rem;
  display: block;
  text-align: center;
  padding-top: 1.86666667rem;
  font-size: 0.32rem;
  color: #515055;
  position: relative;
}
.main .menu ul li a:before {
  display: block;
  font-size: 0.7333333rem;
  color: #ee5655;
  position: absolute;
  top: 0.66666667rem;
  width: 100%;
}
.main .news {
  margin-top: 0.26666667rem;
  background: #fff;
}
.main .news .news-header {
  overflow: hidden;
  padding: 0 0.30666667rem;
  height: 0.93333333rem;
  line-height: 0.93333333rem;
  border-bottom: 0.02666667rem solid #eee;
}
.main .news .news-header h2 {
  float: left;
  font-size: 0.32rem;
}
.main .news .news-header a {
  float: right;
  font-size: 0.29333333rem;
  color: #858585;
}
</style>