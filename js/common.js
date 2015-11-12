var common={
	QueryString: function(item) {
		var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	},
	QueryParam: function(url,item) {
		var svalue = url.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	},
	/**
	 * 把URL参数反序列化为数据
	 * @method parse
	 * @param {String} [qs] URL参数，默认为当前窗口的location.search
	 * @param {Object} [o] 参数
	 *   @param {Function} [o.decode=decodeURIComponent] 解码函数
	 *   @param {String} [o.dataType] 返回数组类型，默认为Object，参数值为'array'时返回数组
	 * @return {Object|Array<Object<name,value>>} 数据
	 */
	parse: function (qs, o) {
		o.decode = decodeURIComponent;
		
		var returnArray = o.dataType === 'array', 
		data = returnArray ? [ ] : { };

		qs = ( qs || window.location.search.substr(1) )
			.replace(/(?:[\?\&])([^&]+)=([^&]+)/g, function($0, $1, $2) {
				var value = $2;
				try {
					value = o.decode(value);
				} catch (e) {

				}
				if (returnArray) {
					data.push({
						name: $1,
						value: value
					});
				} else {
					data[$1] = value;
				}
				return '';
			});
		return data;
	},
	/**
	 ** 乘法函数，用来得到精确的乘法结果
	 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
	 ** 调用：accMul(arg1,arg2)
	 ** 返回值：arg1乘以 arg2的精确结果
	 **/
	accMul:function(arg1, arg2){
	    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	    try {
	        m += s1.split(".")[1].length;
	    }
	    catch (e) {
	    }
	    try {
	        m += s2.split(".")[1].length;
	    }
	    catch (e) {
	    }
	    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);		
	}
}
// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
    return common.accMul(arg, this);
};