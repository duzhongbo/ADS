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
	}

}