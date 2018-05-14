import MD5 from "./MD5"
let _api_key="api_key";
let _api_security="vip_security";
let user_id="user_id";
let platform="web"

function setCatch(key,val){    //设置缓存函数
	return localStorage.setItem(key,val)
}
function getCatch(key){    //获取缓存函数
	return localStorage.getItem(key)
}
//生成请求数据链接
function encryption(json) {
	var obj = {};
	if(json.sign) {
		for(var attr in json.sign) {
			obj[attr] = json.sign[attr]
		}
	};

	var action = json.link.substring(json.link.indexOf('=', 0) + 1);
	var result = sign_part(action, obj);
	var url = json.link;
	if(!json.ifApi&&getCatch(_api_key)&& getCatch(_api_security)) {
		url += "&api_key=" + getCatch(_api_key) + "&vip_security=" + getCatch(_api_security);
	};
	url += "&platform=" + platform + "&timestamp=" + result.timestamp + "&nonce=" + result.nonce + "&sign=" + result.sign;
	return url;
}
//签名加密
function sign_part(action_name, parms_obj) {
	/*将所有参数放到一个数组中*/
	var arr = parms_obj;
	arr.action = action_name;
	arr.api_key = getCatch(_api_key);
	arr.vip_security = getCatch(_api_security);
	arr.platform = "web";
	arr.timestamp = getTimesTamp();
	arr.nonce = getNonce();
	/*去除双引号*/
	var arr_str = sortByAsc(arr);
//	console.log(arr_str)
	var sign = MD5(arr_str);
	sign = sign.toUpperCase();
	var result = {};
	result.timestamp = arr.timestamp;
	result.sign = sign;
	result.nonce = arr.nonce;
	return result;
}
//当前的时间戳
function getTimesTamp() {
	return parseInt(new Date().getTime() / 1000);
}
/*生成随机数的方法*/
function randomWord(randomFlag, min, max) {
	var str = "",
		range = min,
		arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
		pos;
	// 随机产生
	if(randomFlag) {
		range = Math.round(Math.random() * (max - min)) + min;
	}
	for(var i = 0; i < range; i++) {
		pos = Math.round(Math.random() * (arr.length - 1));
		str += arr[pos];
	}
	return str;
}

function getNonce() {
	return randomWord(false, 15);
}
//	数组
let obj = {
	"c": "c",
	"aa": "aa",
	"ac": "ac",
	"g": "g",
	"a": "aaa",
	"b": "bbb",
	"z": "z"
};

let porperts = [];
function sortByAsc(obj) {
	var objTarget = {};
	objTarget = sort_obj(obj);
	
	var parm_str = "";
	for (var i = 0; i < porperts.length; i++) {
		if(!objTarget[porperts[i]]) continue
		parm_str = parm_str + porperts[i] + ":" + objTarget[porperts[i]] + "&";
	}
	parm_str=parm_str.substring(0,parm_str.length-1);
	return parm_str;
}


function sort_obj(obj){
	porperts = [];
	for (var perpername in obj) {
		porperts[porperts.length] = perpername;
	}
	//属性排序
	porperts.sort(function(a, b) {
		var lena = a.length;
		var lenb = b.length;
		var indexlen = lena > lenb ? lenb : lena;
		for (var len = 0; len < indexlen; len++) {
			if (a.substring(len, 1) < b.substring(len, 1)) {
				return -1;
			} else if (a.substring(len, 1) > b.substring(len, 1)) {
				return 1;
			} else {
				continue;
			}
		}
		return lena > lenb ? 1 : -1;
	});
	var result_obj = new Object();
	for (var i = 0; i < porperts.length; i++) {
		if(!obj[porperts[i]]) continue 
		result_obj[porperts[i]] = obj[porperts[i]]
	}
	return result_obj;
}

export {setCatch,getCatch,_api_key,_api_security,user_id,encryption}
