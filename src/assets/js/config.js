//let devUrl="http://101.37.170.194";   //开发环境请求地址
let devUrl="http://livedata.webf10.com";   //生产环境请求地址

let vipcnlogin=devUrl+'/main/enter?action=vipcnlogin';//用户公众号登录
let getfinancenews=devUrl+"/main/vipcn?action=getfinancenews";   //获取财经新闻列表
let getstocklist=devUrl+"/main/vipcn?action=getstocklist";   //短线股票池列表
let getnarratelist=devUrl+"/main/vipcn?action=getnarratelist";   //文字直播列表
let getteacheropinion=devUrl+"/main/vipcn?action=getteacheropinion";    //获取名师观点列表    
let gettraderead=devUrl+"/main/vipcn?action=gettraderead";    //获取行业精读列表
let getwindpostion=devUrl+"/main/vipcn?action=getwindpostion";  //获取大盘风向
let getpastlayout=devUrl+"/main/vipcn?action=getpastlayout";  //获取历史股票
let gettodaylayout=devUrl+"/main/vipcn?action=gettodaylayout";  //获取今日发布
let gettextstream=devUrl+"/main/vipcn?action=gettextstream";  //获取直播流
let getpostionchange=devUrl+"/main/vipcn?action=getpostionchange";  //获取调仓
var serch="https://devxcx.webf10.com/xcx/ind?action=serch";         //查一查
let getuserinfo=devUrl+"/main/vipcn?action=getuserinfo";  //获取调仓

export {vipcnlogin,getfinancenews,getstocklist,getnarratelist,getteacheropinion,gettraderead,getwindpostion,getpastlayout,gettodaylayout,gettextstream,getpostionchange,serch,getuserinfo};
