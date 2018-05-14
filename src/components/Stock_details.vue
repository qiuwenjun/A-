<template>
	<div class="container-detailes">
			<header class="header">
	    	<div class="header_content">
		        <div class="header-top">
		        	<h2 class="Stock_name"><strong v-text="data.stock_name"></strong> ({{data.stock_number}}) </h2>
		        	<time class="create_time">创建时间:{{data.send_time}}</time>
		        </div>
		        <div class="header-center">
		        	<div class="header-center-left">
		        		<h3>总收益</h3>
		        		<p class="header-center-left_index" :style="{color:parseInt(data.revenue_rate)>=0?'rgba(240,91,90)':'rgb(76, 175, 80)'}" v-text="data.revenue_rate"></p>
		        		<p class="header-center-left_monery" :style="{color:!(data.total_revenue.toString().startsWith('-'))?'rgba(240,91,90)':'rgb(76, 175, 80)'}">{{data.total_revenue}}<span>元</span></p>
		        	</div>
		        	<div class="header-center-right">
		        		<div class="">
		        			<h3>总市值</h3>
		        			<p class="market_value">{{data.market_value}}</p>
		        		</div>
		        		<div class="">
		        			<h3>初始资金</h3>
		        			<p class="Initial_capital">{{data.money}}</p>
		        		</div>
		        	</div>
		        </div>
		        <div class="hrader-bottom">
		        	<table cellpadding="0" cellspacing="0">
		        		<thead>
		        			<tr>
		        				<th>仓位</th>
		        				<th>持仓</th>
		        				<th>成本价</th>
		        				<th>现价</th>
		        			</tr>
		        		</thead>
		        		<tbody>
		        			<tr>
		        				<td class="Positions" v-text="data.revenue_rate"></td>
		        				<td class="Position" v-text="data.postion_number"></td>
		        				<td class="cost_price" v-text="data.buy_pri"></td>
		        				<td class="Current_price" v-text="data.now_pri"></td>
		        			</tr>
		        		</tbody>
		        	</table>
		        </div>   		
	    	</div>
	    </header>
	    <section class="Layout-description">
	        <div class="description-title">
				     <i class="iconfont icon-wenjian"></i>布局说明
	        </div>
	        <div class="description-conten">
	            <h5><strong class="teacher_name" v-text="data.teacher_name"></strong>资格证书编号：<b class="license_number" v-text="data.teacher_number"></b></h5>
	            <div id="stock_description" :style="{height:openFlag?'auto':'2rem'}" v-html="data.stock_description">
	               
	            </div>
	            <a class="open" @click="open" :class="{active:openFlag}">》</a>
	        </div>
	    </section>
	    <section class="Time-slot">
	        <div class="Time-Touch">
	            <ul class="clearfix" @click="changed">
	                <li :class="{active:index==0}" data-index="0"></li>
	                <li :class="{active:index==1}" data-index="1"></li>
	            </ul>
	        </div>
	        <div class="Time-Touch-content">
	            <dl class="clearfix">
	                <dd class="Live-stream" :style="{display:index?'none':'block'}" id="text_stream">
	                	<p class="noData" v-if="!liveStrea.length">{{liveStreaText}}</p>
	                	<div class="Live-content" v-else v-for="item,index in liveStrea">
							<time v-text="item.create_time"></time>
							<p class="Transfer-introduce" v-text="item.content"></p>
						</div>
	                </dd>
					<dd class="Transfer-positions" :style="{display:index?'block':'none'}"  id="postion_change">
						<p class="noData" v-if="!warehouse.length">{{warehouseText}}</p>
						<div class="Transfer-content" v-else v-for="item,index in warehouse">
				          <time v-text="item.create_time"></time>
				          <div class="percentage">
					              <div class="percentage-title">
						            <h2 v-text="data.stock_name"></h2>
						            <em v-text="data.stock_number"></em>
						            <span v-text="item.if_buy?'买':'卖'"></span>
						          </div>
						          <div class="percentage-angin clearfix">
						            <div class="angin-left">
											<div class="angin-left-top">
						                	<span>{{item.previous_postion}}<i>%</i></span>
						                    <img src="../assets/img/jiantou.png" alt="">
						                    <span>{{item.postion}}<i>%</i></span>
						              </div>
						            	<div class="angin-left-bottom">
							                <span>{{item.previous_stock_number}}<i>股</i></span>
							              	<img src="../assets/img/jiantou.png" alt="">
							                <span>{{item.stock_number}}<i>股</i></span>
						            	</div>
						            </div>
						              <div class="angin-right">
						                <h2>{{item.if_buy?"买入价位":"卖出价位"}}</h2>
						                <p>{{item.price}}</p>
						              </div>
						          </div>
				               <p class="Transfer-introduce" v-text="item.reason">
					               	
				               </p>
				          </div>
			            </div>
					</dd>
	            </dl>
	        </div>
	    </section>
		</div>
</template>

<script>
	export default {
		name:"Stock_details",
		props:["name","data","id"],
		data(){
			return {
				openFlag:false,
				index:0,
				liveStrea:"",
				warehouse:"",
				liveStreaText:'',
				warehouseText:''
			}
		},
		created(){
			if(!this.index){
				this.getMsg();
			}
		},
		methods:{
			open(){
				this.openFlag=!this.openFlag;
			},
			changed(ev){
				var ev=ev||window.event;
				var target=ev.target||ev.srcElement;
				if(target.nodeName.toLowerCase()=="li"){
					this.index=parseInt(target.dataset.index);	
					if(this.index==0&&!this.liveStrea||this.index==1&&!this.warehouse){
						this.getMsg();
					}
				}
			},
			getMsg(){
				this.$store.dispatch("getStockDetail",{
					link:this.index,
					id:this.data.id
				}).then((success)=>{
					if(success.data.status==0){
						this[this.index?'warehouse':'liveStrea']=success.data.data;
						if(!success.data.data.length&&this.index==0){
							this.liveStreaText="暂未有直播流信息！！！"
						}else if(!success.data.data.length&&this.index==1){
							this.warehouseText="暂未有调仓信息！！！"
						}
					}else if(success.data.status==1){
						this.$store.commit("submitPrompt",{
							flag:true,
							text:success.data.error,
							status:1
						})
					}
				},(error)=>{
					console.log(error)
				})
			}
		},
		beforeRouteLeave(to,from,next){
			console.log(to,from,next)
			next();
		}
	}
</script>

<style lang="less" scoped>
@rem:75rem;
.container-detailes {
  background: #f5f5f5;
}
.container-detailes * {
  box-sizing: border-box;
}
.container-detailes .header {
  background: url(../assets/img/bg_01.png) no-repeat center top;
  background-size:10rem 262/@rem;
  padding: 28/@rem 25/@rem 0;
  margin-bottom: 20/@rem;
}
.container-detailes .header .header_content{
	box-shadow: 0 0 30/@rem rgba(0,0,0,0.4);
	border-radius: 15/@rem;
	overflow: hidden;
	background: #fff;
	height: 100%;
}
.container-detailes .header .header-top{
	padding: 30/@rem 35/@rem 0/@rem;
	background-size: contain;
}
.container-detailes .header .header-top h2{
	font-size: 48/@rem;
	color: #6a6a6a;
}
.container-detailes .header .header-top h2 strong{
	position:relative;
	font-weight: 800;
	color: #515151;
}
.container-detailes .header .header-top h2 strong:after{
	display: block;
	width: 100%;
	height: 6/@rem;
	position: absolute;
	content: "";
	background: -webkit-linear-gradient(left,#ef5857,#fb7271);
}
.container-detailes .header .header-top time{
	line-height: 80/@rem;
	font-size: 32/@rem;
	color: #8e8e8e;
}
.container-detailes .header .header-center{
	padding: 0 35/@rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	overflow: hidden;
	background: #fff;
}
.container-detailes .header .header-center .header-center-left{
	
}
.container-detailes .header .header-center .header-center-left h3{
	color: #8e8e8e;
	font-size: 48/@rem;
	font-weight: 800;
}
.container-detailes .header .header-center .header-center-left p{
	color:#ff2626;
	font-size: 68/@rem;
	font-weight: 800;	
}
.container-detailes .header .header-center .header-center-left p span{
	font-size: 32/@rem;
}
.container-detailes .header .header-center .header-center-right div:first-child{
	margin-top: 0;
}
.container-detailes .header .header-center .header-center-right div{
	border-radius: 8/@rem;
	border:2/@rem solid #fff6e8;
	padding: 15/@rem 30/@rem;
	margin-top:10/@rem;
}
.container-detailes .header .header-center .header-center-right div *{
	font-size: 32/@rem;
	color: #8e8e8e;	
}
.container-detailes .header .header-center .header-center-right div h3{
	font-weight: 800;
}
.container-detailes .header .hrader-bottom{
	height: 154/@rem;
	padding-top: 40/@rem;
	background: url(../assets/img/bg_03.png) no-repeat center bottom;
	background-size: 100% 73/@rem;
}
.container-detailes .header .hrader-bottom table{
	width:100%;
	text-align: center;
}
.container-detailes .header .hrader-bottom table *{
	font-weight: 800;
	color: #8e8e8e;
	font-size: 32/@rem;
}
.container-detailes .header .hrader-bottom table th,.container-detailes .header .hrader-bottom table td{
	border-right: 2/@rem solid #8e8e8e;
	text-align: center;
}
.container-detailes .header .hrader-bottom table th:last-child,.container-detailes .header .hrader-bottom table td:last-child{
	border: none;
}
.container-detailes .Layout-description {
  width: 700/@rem;
  margin: 0 auto;
  border-radius: 15/@rem;
  overflow: hidden;
  box-shadow: 0 0 30/@rem rgba(0,0,0,0.4);
  background: #fff;
}
.container-detailes .Layout-description .description-title {
  padding: 15/@rem 26/@rem 10/@rem;
  font-size: 32/@rem;
  color: #fff;
  font-weight: 800;
  background: -webkit-linear-gradient(left, #f3605f 0%, #fa706f 100%);
}
.container-detailes .Layout-description .description-title i {
	font-size: 30/@rem;
	margin-right: 10/@rem;
}
.container-detailes .Layout-description .description-conten {
  padding: 16/@rem 16/@rem;
  position: relative;
  text-align: center;
}
.container-detailes .Layout-description .description-conten h5 {
  width: 560/@rem;
  margin: 0 auto;
  padding: 18/@rem 0;
  text-align: center;
  font-size: 24/@rem;
  color: #8e8e8e;
}
.container-detailes .Layout-description .description-conten h5 strong {
  font-size: 32/@rem;
  margin-right: 10/@rem;
}
.container-detailes .Layout-description .description-conten div {
  font-size: 24/@rem;
  color: #8e8e8e;
  padding: 38/@rem 34/@rem 0;
  text-align: justify;
  line-height: 35/@rem;
  height: 148/@rem;
  overflow: hidden;
}
.container-detailes .Layout-description .description-conten div p{
	word-break:break-all; /*支持IE，chrome，FF不支持*/
	word-wrap:break-word;/*支持IE，chrome，FF*/	
}
.container-detailes .Layout-description .description-conten a {
  font-size: 24/@rem;
  color: #8e8e8e;
  margin: 0 auto;
  display: inline-block;
  width: auto;
  transform: rotate(90deg);
  line-height: 60/@rem;
}
.container-detailes .Layout-description .description-conten a.active{
	transform: rotateZ(-90deg);
}
.container-detailes .Time-slot {
  margin: 20/@rem auto;
  padding: 0 35/@rem;
}
.container-detailes .Time-slot .Time-Touch {
  /*padding-left: 40px;*/
}
.container-detailes .Time-slot .Time-Touch li {
  float: left;
  width: 100/@rem;
  border-radius: 3/@rem 0 0 3/@rem;
  color: #f56564;
  height: 44/@rem;
  font-size: 22/@rem;
  padding: 0 10/@rem;
  box-sizing: content-box;
  border: 2/@rem solid #f56564;
}
.container-detailes .Time-slot .Time-Touch li:after {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height:44/@rem;
  content: "直播流";
}
.container-detailes .Time-slot .Time-Touch li:nth-child(2){
	border-radius:0;
}
.container-detailes .Time-slot .Time-Touch li:nth-child(2):after {
  content: "调仓";
}
.container-detailes .Time-slot .Time-Touch li:last-child{
	border-radius: 0 3/@rem 3/@rem 0;
}
.container-detailes .Time-slot .Time-Touch li.active {
  background-image: -webkit-linear-gradient(left, #ee5655 0%, #fe7877 100%);
}
.container-detailes .Time-slot .Time-Touch li.active:after {
  background: none;
  color: #fff;
  -webkit-background-clip: inherit;
  -webkit-text-fill-color: inherit;
}
.container-detailes .Time-slot .Time-Touch-content {
  margin-top: 25/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .noData{
	text-align: left;
	padding:10/@rem 50/@rem;
	font-size: 20/@rem;
}
.container-detailes .Time-slot .Time-Touch-content dd:first-child .noData{
	background: url(../assets/img/bg.png) no-repeat 2% center;
	background-size:contain;
}
.container-detailes .Time-slot .Time-Touch-content dd:last-child .noData{
	background: url(../assets/img/img.png) no-repeat 2% center;
	background-size:contain;
}
.container-detailes .Time-slot .Time-Touch-content dd {
  display: none;
}
.container-detailes .Time-slot .Time-Touch-content .Live-stream .Live-content {
  padding-left: 60/@rem;
  margin-bottom: 45/@rem ;
  background: url(../assets/img/bg.png) no-repeat left center;
  background-size: 40/@rem 100% ;
  margin-bottom: 20/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .Live-stream .Live-content time{
  font-size: 26/@rem;
  color: #8e8e8e;
  display: block;
}
.container-detailes .Time-slot .Time-Touch-content .Live-stream .Live-content p{
  color: #8e8e8e;
  font-size:22/@rem;
  margin-top: 20/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content{
	padding: 0 0 0 50/@rem;
	background: url(../assets/img/img.png) no-repeat left center;
	background-size: 39/@rem 100%;
	margin-bottom: 20/@rem;      	
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content time {
  font-size: 26/@rem;
  color: #8e8e8e;
  display: block;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage {
  background: #fff;
  padding:20/@rem 35/@rem;
  margin-top: 30/@rem;
  box-shadow: 0 0 18/@rem rgba(0, 0, 0, 0.4);
  border-radius: 10/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-title {
  display: flex;
  align-items: flex-end;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-title h2{
  font-size: 32/@rem;
  color: #505050;
  margin-right: 10/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-title em{
  font-size: 24/@rem;
  color: #8e8e8e;
  margin-right: 10/@rem;  
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-title span{
  font-size: 18/@rem;
  color: #fff;
  display: block;
  padding: 5/@rem 15/@rem;
  background:-webkit-linear-gradient(left, #fec631 0%, #fb9c20 100%);
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin {
  padding: 10/@rem 0/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-left {
  float: left;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-left div span {
  font-size: 72/@rem;
  color: #feb53a;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-left div span i {
  font-size: 36/@rem;
  font-style: normal;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-left div img {
  margin: 0 10/@rem;
  width: 46/@rem;
  display: inline-block;
  vertical-align: 20/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-left div span:last-child {
  color: #ffb336;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-left .angin-left-bottom span {
  font-size: 24/@rem;
  color: #8e8e8e !important;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-left .angin-left-bottom span i {
  font-size: 24/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-left .angin-left-bottom img {
  vertical-align: 3/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-right {
  float: right;
  padding-top: 20/@rem;
  margin-right: 25/@rem;
  color: #8e8e8e;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-right h2 {
  font-size: 24/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .percentage-angin .angin-right p {
  font-size: 48/@rem;
}
.container-detailes .Time-slot .Time-Touch-content .Transfer-positions .Transfer-content .percentage .Transfer-introduce {
  padding: 4% 0;
  line-height: 1.4;
  text-align: justify;
  font-size: 24/@rem;
  color: #8d8d8d;
}

</style>