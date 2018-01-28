//类扩展

//Date对象扩展    start
/**
 * 将Date转换为指定格式的String
 * 年(y)、月(M)、日(d)、小时(h)、分(m)、秒(s)、毫秒(S)、季度(q)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2012-07-02 08:09:04.423 
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2012-7-2 8:9:4.18
 * @param {Object} fmt
 */
Date.prototype.Format = function(fmt){
	var o = {
		"M+" : this.getMonth() + 1,          			//月份
		"d+" : this.getDate(),               			//日
		"h+" : this.getHours(),							//小时
		"m+" : this.getMinutes(),                       //分
		"s+" : this.getSeconds(),                       //秒
		"q+" : Math.floor((this.getMonth() + 3) / 3),   //季度
		"S"  : this.getMilliseconds()                   //毫秒
	};
	if(/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,(this.getFullYear() + "").substr(
			4 - RegExp.$1.length));
	}
	for(var k in o){
		if(new RegExp("(" + k + ")").test(fmt)){
			fmt = fmt.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k]
				 : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return fmt;
};

/**
 *获取当前时间 ，格式为（yyyy-MM-dd hh:mm:ss） 
 */
Date.prototype.currentFormatTime = function(){
	return new Date().Format('yyyy-MM-dd hh:mm:ss');
};

/**
 * 获取当前时间，格式为（yyyy-MM-dd）
 */
Date.prototype.currentSimpleFormatTime = function(){
	return new Date().Format('yyyy-MM-dd');
};

//end

